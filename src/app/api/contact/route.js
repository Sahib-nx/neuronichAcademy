import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter (using Gmail as example)
    // You'll need to set up environment variables
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    })

    // Alternative: Using SMTP settings
    // const transporter = nodemailer.createTransporter({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: process.env.SMTP_SECURE === 'true',
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // })

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
          }
          .header h1 {
            color: #D72638;
            margin: 0;
            font-size: 28px;
          }
          .content {
            background: white;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 20px;
          }
          .field {
            margin-bottom: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #00A6FB;
          }
          .field-label {
            font-weight: bold;
            color: #495057;
            margin-bottom: 5px;
            display: block;
          }
          .field-value {
            color: #212529;
            word-wrap: break-word;
          }
          .message-field {
            border-left-color: #FF5DA2;
          }
          .footer {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            color: #6c757d;
          }
          .priority {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .priority-emergency {
            background: #dc3545;
            color: white;
          }
          .priority-normal {
            background: #28a745;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧠 New Contact Form Submission</h1>
            <span class="priority ${subject === 'emergency' ? 'priority-emergency' : 'priority-normal'}">
              ${subject === 'emergency' ? 'URGENT - Emergency' : 'Normal Priority'}
            </span>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="field-label">👤 Name:</span>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <span class="field-label">📧 Email:</span>
              <div class="field-value">${email}</div>
            </div>
            
            ${phone ? `
            <div class="field">
              <span class="field-label">📞 Phone:</span>
              <div class="field-value">${phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="field-label">📋 Subject:</span>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field message-field">
              <span class="field-label">💬 Message:</span>
              <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the Mind Mastery contact form.</p>
            <p><em>Received at: ${new Date().toLocaleString()}</em></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Auto-reply to sender
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Dr. Elena</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background: linear-gradient(135deg, #00A6FB 0%, #FF5DA2 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
          }
          .logo {
            font-size: 48px;
            margin-bottom: 20px;
          }
          .title {
            color: #D72638;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .message {
            color: #495057;
            margin-bottom: 25px;
            line-height: 1.7;
          }
          .highlight {
            color: #FF5DA2;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
          }
          .emergency {
            background: #f8d7da;
            border: 2px solid #dc3545;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
          }
          .emergency h3 {
            color: #721c24;
            margin-top: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="logo">🧠💫</div>
            <h1 class="title">Thank You, ${name}!</h1>
            
            <div class="message">
              <p>I've received your message regarding <span class="highlight">"${subject}"</span> and truly appreciate you reaching out.</p>
              
              <p>Your mental wellness journey is important to me, and I'm committed to providing you with the support and care you deserve.</p>
              
              <p><strong>What happens next:</strong></p>
              <ul style="text-align: left; display: inline-block;">
                <li>I'll review your message carefully</li>
                <li>You'll hear back from me within <span class="highlight">24 hours</span></li>
                <li>We can schedule a consultation if appropriate</li>
                <li>All communications remain strictly confidential</li>
              </ul>
            </div>
            
            ${subject === 'emergency' ? `
            <div class="emergency">
              <h3>🚨 Important - Emergency Support</h3>
              <p><strong>If you're experiencing a mental health crisis, please don't wait for my response.</strong></p>
              <p>Call <strong>988</strong> for immediate crisis support or <strong>911</strong> for emergency services.</p>
            </div>
            ` : ''}
            
            <div class="footer">
              <p><strong>Dr. Elena Consciousness, Ph.D.</strong><br>
              Licensed Clinical Psychologist<br>
              📧 dr.elena@mindmastery.com | 📞 (555) 123-4567</p>
              
              <p><em>This is an automated response. Please do not reply to this email directly.</em></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email to doctor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.DOCTOR_EMAIL || process.env.EMAIL_USER,
      subject: `${subject === 'emergency' ? '🚨 URGENT - ' : ''}New Contact: ${subject} - ${name}`,
      html: htmlContent,
      replyTo: email,
    })

    // Send auto-reply to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Dr. Elena - Mind Mastery Psychology",
      html: autoReplyHtml,
    })

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

// Environment variables needed in .env.local:
/*
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
DOCTOR_EMAIL=doctor@mindmastery.com (optional, defaults to EMAIL_USER)

# Alternative SMTP settings (instead of Gmail):
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
*/