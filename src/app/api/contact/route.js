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

    // Create transporter (using Gmail SMTP as example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Beautiful styled HTML email content for YOU
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 10px;
            background-color: #f8f9fa;
            -webkit-text-size-adjust: 100%;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            max-width: 100%;
          }
          .header {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            text-align: center;
          }
          .header h1 {
            color: #D72638;
            margin: 0;
            font-size: 22px;
            line-height: 1.2;
          }
          .content {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          .field {
            margin-bottom: 12px;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
            border-left: 3px solid #00A6FB;
          }
          .field-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 4px;
            display: block;
            font-size: 14px;
          }
          .field-value {
            color: #212529;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.4;
          }
          .message-field {
            border-left-color: #FF5DA2;
          }
          .footer {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            color: #6c757d;
            font-size: 12px;
          }
          .priority {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-top: 8px;
          }
          .priority-emergency {
            background: #dc3545;
            color: white;
          }
          .priority-normal {
            background: #28a745;
            color: white;
          }
          @media screen and (max-width: 480px) {
            body { padding: 5px; }
            .container { padding: 10px; }
            .header, .content, .footer { padding: 12px; }
            .field { padding: 10px; margin-bottom: 10px; }
            .header h1 { font-size: 20px; }
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

    // Beautiful auto-reply HTML for the USER
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Dr. Elena</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 10px;
            background-color: #f8f9fa;
            -webkit-text-size-adjust: 100%;
          }
          .container {
            background: linear-gradient(135deg, #00A6FB 0%, #FF5DA2 100%);
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            max-width: 100%;
          }
          .content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .logo {
            font-size: 36px;
            margin-bottom: 15px;
          }
          .title {
            color: #D72638;
            font-size: 24px;
            margin-bottom: 15px;
            line-height: 1.2;
          }
          .message {
            color: #495057;
            margin-bottom: 20px;
            line-height: 1.5;
            font-size: 14px;
            text-align: left;
          }
          .highlight {
            color: #FF5DA2;
            font-weight: 600;
          }
          .footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px solid #e9ecef;
            color: #6c757d;
            font-size: 12px;
          }
          .emergency {
            background: #f8d7da;
            border: 2px solid #dc3545;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
          }
          .emergency h3 {
            color: #721c24;
            margin: 0 0 10px 0;
            font-size: 16px;
          }
          .emergency p {
            margin: 8px 0;
            font-size: 13px;
          }
          ul {
            padding-left: 20px;
            margin: 10px 0;
          }
          li {
            margin-bottom: 6px;
            font-size: 14px;
          }
          @media screen and (max-width: 480px) {
            body { padding: 5px; }
            .container { padding: 10px; }
            .content { padding: 15px; }
            .title { font-size: 22px; }
            .logo { font-size: 32px; }
            .message { font-size: 13px; }
            .emergency { padding: 12px; }
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

    // Send email to YOU 
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.DOCTOR_EMAIL || process.env.EMAIL_USER,
      subject: `${subject === 'emergency' ? '🚨 URGENT - ' : ''}New Contact: ${subject} - ${name}`,
      html: htmlContent,
      replyTo: email,
    })

    //  auto-reply to USER
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
