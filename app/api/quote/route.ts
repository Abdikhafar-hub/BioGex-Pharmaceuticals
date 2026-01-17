
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const GHL_API_VERSION = "2021-07-28"
const GHL_BASE_URL = "https://services.leadconnectorhq.com" // V2 API URL

// Schema for the incoming request
const quoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
  products: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1)
  })).min(1, "At least one product must be selected")
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = quoteRequestSchema.parse(body)

    const accessToken = process.env.GHL_ACCESS_TOKEN
    const locationId = process.env.GHL_LOCATION_ID
    
    // Contact-level reporting field (Dropdown)
    const contactProductFieldId = process.env.GHL_FIELD_ID_PRODUCTS
    
    // Opportunity-level fields (New)
    const oppProductFieldId = process.env.GHL_OPP_FIELD_ID_PRODUCTS
    const oppOrderLineItemsId = process.env.GHL_OPP_FIELD_ID_ORDER_LINE_ITEMS
    const oppQuoteMessageId = process.env.GHL_OPP_FIELD_ID_QUOTE_MESSAGE

    if (!accessToken || !locationId) {
      console.error("Missing GHL configuration")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Version": GHL_API_VERSION,
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    // --- 1. PREPARE DATA ---

    // A. Normalized Product Names (for Dropdowns) - Single spaces
    const productNames = validatedData.products.map(p => p.name.replace(/\s+/g, ' ').trim())

    // B. Order Line Items String (for Large Text Field)
    // Format: "Product Name - Qty pkts, ..."
    const orderLineItemsString = validatedData.products
        .map(p => `${p.name.replace(/\s+/g, ' ').trim()} - ${p.quantity} pkts`)
        .join(', \n')

    // C. Rich Note (Legacy Backup)
    const richDescription = `
Message: 
${validatedData.message || "N/A"}

Requested Items:
${validatedData.products.map(p => `- ${p.name} (Qty: ${p.quantity})`).join("\n")}
    `.trim()

    // --- 2. UPSERT CONTACT ---
    
    // Contact Custom Fields: Only the Reporting Field (Dropdown)
    const contactCustomFields = []
    if (contactProductFieldId) {
        contactCustomFields.push({
            id: contactProductFieldId,
            value: productNames 
        })
    }

    const contactPayload: any = {
        locationId,
        firstName: validatedData.name.split(" ")[0],
        lastName: validatedData.name.split(" ").slice(1).join(" ") || "",
        companyName: validatedData.companyName, 
        email: validatedData.email,
        phone: validatedData.phone,
        source: "Biogex Website (Quote Page)",
        tags: ["web-quote-request"],
        createNewIfDuplicateAllowed: false,
        customFields: contactCustomFields
    }

    let contactId: string | null = null

    try {
        const upsertResponse = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
            method: "POST",
            headers,
            body: JSON.stringify(contactPayload)
        })

        if (!upsertResponse.ok) {
            const errorText = await upsertResponse.text()
            console.error("GHL Contact Upsert Error:", errorText)
            throw new Error(`GHL Upsert Failed: ${errorText}`)
        }

        const contactData = await upsertResponse.json()
        contactId = contactData.contact?.id || contactData.id

    } catch (err) {
        console.error("Contact Sync Failed:", err)
        throw new Error("Failed to sync contact details")
    }

    // --- 3. CREATE OPPORTUNITY ---
    
    if (contactId) {
        const timestamp = new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
        
        // Opportunity Custom Fields (Using field_value as per documentation)
        const oppCustomFields = []
        
        // 1. Products Interested In (Dropdown - Opportunity Level)
        if (oppProductFieldId) {
            oppCustomFields.push({ id: oppProductFieldId, field_value: productNames })
        }
        
        // 2. Order Line Items (Large Text - Opportunity Level)
        if (oppOrderLineItemsId) {
            oppCustomFields.push({ id: oppOrderLineItemsId, field_value: orderLineItemsString })
        }
        
        // 3. Quote Message
        if (oppQuoteMessageId) {
            oppCustomFields.push({ id: oppQuoteMessageId, field_value: validatedData.message || "" })
        }

        const opportunityPayload = {
            locationId,
            contactId,
            pipelineId: process.env.GHL_PIPELINE_ID, 
            pipelineStageId: process.env.GHL_STAGE_ID,       
            name: `${validatedData.name} - ${timestamp}`,
            status: "open",
            // title: removed
            // notes: removed
            customFields: oppCustomFields
        }
        
        try {
             const oppResponse = await fetch(`${GHL_BASE_URL}/opportunities/`, {
                method: "POST",
                headers,
                body: JSON.stringify(opportunityPayload)
            })
            
            if (!oppResponse.ok) {
                console.error("GHL Opportunity Creation Error:", await oppResponse.text())
            }
        } catch (error) {
            console.error("Failed to create opportunity", error)
        }
    }

    return NextResponse.json({ success: true, message: "Quote request processed" })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
