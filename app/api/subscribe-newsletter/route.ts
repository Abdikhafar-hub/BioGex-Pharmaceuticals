import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'info@biogexpharma.com',
        pass: process.env.SMTP_PASSWORD || 'BiogexInfo24*',
      },
    })

    // Email to admin about new subscription
    const adminEmail = {
      from: process.env.SMTP_USER || 'info@biogexpharma.com',
      to: process.env.SMTP_USER || 'info@biogexpharma.com',
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2e7d32; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <img src="https://res.cloudinary.com/ddkkfumkl/image/upload/v1754313216/logofullbgless_mve3s2.png" alt="BioGex Pharmaceuticals" style="height: 40px; margin-bottom: 10px;">
            <h1 style="margin: 0; font-size: 24px;">BioGex Pharmaceuticals</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <h2 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px; margin-top: 0;">
              New Newsletter Subscription
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Subscription Details:</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subscription Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                <strong>Total Subscribers:</strong> This subscriber has been added to your newsletter list.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>Office 7, The Close, Ngara Road, Nairobi, Kenya<br>
            Phone: +254 748 763980 | Email: info@biogexpharma.com</p>
          </div>
        </div>
      `,
    }

    // Welcome email to subscriber
    const subscriberEmail = {
      from: process.env.SMTP_USER || 'info@biogexpharma.com',
      to: email,
      subject: 'Welcome to BioGex Pharmaceuticals Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2e7d32; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <img src="https://res.cloudinary.com/ddkkfumkl/image/upload/v1754313216/logofullbgless_mve3s2.png" alt="BioGex Pharmaceuticals" style="height: 40px; margin-bottom: 10px;">
            <h1 style="margin: 0; font-size: 24px;">BioGex Pharmaceuticals</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <h2 style="color: #2e7d32; margin-top: 0;">Welcome to Our Newsletter!</h2>
            
            <p>Thank you for subscribing to the BioGex Pharmaceuticals newsletter! We're excited to keep you informed about the latest developments in pharmaceutical distribution and healthcare.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">What you'll receive:</h3>
              <ul style="color: #555; padding-left: 20px;">
                <li>Latest pharmaceutical industry insights and trends</li>
                <li>Regulatory updates and compliance information</li>
                <li>Company news and announcements</li>
                <li>Exclusive content and expert analysis</li>
                <li>Special offers and product updates</li>
              </ul>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <h4 style="color: #2e7d32; margin-top: 0;">Your Subscription Details:</h4>
              <p style="margin: 0; color: #555;">
                <strong>Email:</strong> ${email}<br>
                <strong>Subscription Date:</strong> ${new Date().toLocaleDateString()}<br>
                <strong>Frequency:</strong> Monthly newsletters
              </p>
            </div>
            
            <p style="margin-top: 20px;">We respect your privacy and will never share your email address. You can unsubscribe at any time by clicking the unsubscribe link in our emails.</p>
            
            <p>Best regards,<br>
            <strong>The BioGex Pharmaceuticals Team</strong></p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>Office 7, The Close, Ngara Road, Nairobi, Kenya<br>
            Phone: +254 748 763980 | Email: info@biogexpharma.com</p>
          </div>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(adminEmail)
    await transporter.sendMail(subscriberEmail)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Newsletter subscription successful' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again later.' 
      },
      { status: 500 }
    )
  }
} 