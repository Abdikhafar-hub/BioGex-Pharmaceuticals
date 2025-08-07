import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

export async function GET(request: NextRequest) {
  try {
    const sheets = google.sheets({ version: 'v4', auth })
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.SHEET_NAME || 'Sheet1',
    })

    const rows = response.data.values

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }

    // Find the header row (row with "PRODUCT" in it)
    let headerRowIndex = -1
    let headers: string[] = []
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (row && row.some(cell => cell && cell.toString().toUpperCase().includes('PRODUCT'))) {
        headerRowIndex = i
        headers = row.map(header => header?.toString().trim() || '').filter(header => header !== '')
        break
      }
    }

    if (headerRowIndex === -1) {
      return NextResponse.json({ error: 'Could not find product headers in the sheet' }, { status: 404 })
    }

    console.log('Found headers at row:', headerRowIndex)
    console.log('Headers:', headers)

    // Get data rows starting from the row after headers
    const dataRows = rows.slice(headerRowIndex + 1)
    
    const products = dataRows
      .filter(row => row && row.some(cell => cell && cell.toString().trim() !== '')) // Filter out empty rows
      .map((row, index) => {
        const product: any = {}
        
        // The data has an extra empty column at the beginning, so we need to offset by 1
        // Raw data: ["","10CC SYRINGES 100'S","100","588"]
        // Headers: ["PRODUCT","DESCRIPTION","PRICE(Ksh)."]
        // So: row[1] maps to "PRODUCT", row[2] maps to "DESCRIPTION", row[3] maps to "PRICE(Ksh)."
        
        headers.forEach((header: string, colIndex: number) => {
          const value = row[colIndex + 1] || '' // Offset by 1 to skip the empty first column
          const cleanHeader = header.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
          product[cleanHeader] = value.toString().trim()
        })
        
        // Add a unique ID
        product.id = index + 1
        
        return product
      })
      .filter(product => {
        // Filter out products that don't have meaningful data
        const hasProductName = product.product && product.product.trim() !== ''
        const hasDescription = product.description && product.description.trim() !== ''
        return hasProductName || hasDescription
      })

    console.log('First processed product:', products[0])
    console.log('Total products processed:', products.length)

    return NextResponse.json({ 
      products,
      debug: {
        totalRows: rows.length,
        headerRowIndex: headerRowIndex,
        headers: headers,
        dataRows: dataRows.length,
        processedProducts: products.length
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 