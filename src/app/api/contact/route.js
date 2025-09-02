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
            color: #264653;
            margin: 0;
            padding: 10px;
            background-color: #f8f9fa;
            -webkit-text-size-adjust: 100%;
          }
          .container {
            background: linear-gradient(135deg, #2A9D8F 0%, #264653 100%);
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(38, 70, 83, 0.15);
            max-width: 100%;
          }
          .header {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            text-align: center;
            border-top: 4px solid #E9C46A;
          }
          .header h1 {
            color: #264653;
            margin: 0;
            font-size: 22px;
            line-height: 1.2;
            font-weight: 700;
          }
          .content {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(38, 70, 83, 0.08);
          }
          .field {
            margin-bottom: 12px;
            padding: 12px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 6px;
            border-left: 4px solid #2A9D8F;
            transition: all 0.3s ease;
          }
          .field:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 12px rgba(42, 157, 143, 0.1);
          }
          .field-label {
            font-weight: 600;
            color: #264653;
            margin-bottom: 4px;
            display: block;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            color: #264653;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 500;
          }
          .message-field {
            border-left-color: #E76F51;
            background: linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%);
          }
          .phone-field {
            border-left-color: #F4A261;
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          }
          .subject-field {
            border-left-color: #E9C46A;
            background: linear-gradient(135deg, #fffbeb 0%, #fde68a 100%);
          }
          .footer {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            color: #2A9D8F;
            font-size: 12px;
            border-bottom: 4px solid #E9C46A;
          }
          .priority {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 8px;
            letter-spacing: 0.5px;
          }
          .priority-emergency {
            background: linear-gradient(135deg, #E76F51 0%, #dc2626 100%);
            color: white;
            animation: pulse 2s infinite;
          }
          .priority-normal {
            background: linear-gradient(135deg, #2A9D8F 0%, #059669 100%);
            color: white;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(231, 111, 81, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(231, 111, 81, 0); }
            100% { box-shadow: 0 0 0 0 rgba(231, 111, 81, 0); }
          }
          @media screen and (max-width: 480px) {
            body { padding: 5px; }
            .container { padding: 10px; }
            .header, .content, .footer { padding: 12px; }
            .field { padding: 10px; margin-bottom: 10px; }
            .header h1 { font-size: 20px; }
            .priority { padding: 6px 12px; font-size: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧠 New Contact Form Submission</h1>
            <span class="priority ${subject === 'emergency' ? 'priority-emergency' : 'priority-normal'}">
              ${subject === 'emergency' ? '🚨 URGENT - Emergency' : '✅ Normal Priority'}
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
            <div class="field phone-field">
              <span class="field-label">📞 Phone:</span>
              <div class="field-value">${phone}</div>
            </div>
            ` : ''}
            
            <div class="field subject-field">
              <span class="field-label">📋 Subject:</span>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field message-field">
              <span class="field-label">💬 Message:</span>
              <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Mind Mastery Psychology Contact Form</strong></p>
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
            color: #264653;
            margin: 0;
            padding: 10px;
            background-color: #f8f9fa;
            -webkit-text-size-adjust: 100%;
          }
          .container {
            background: linear-gradient(135deg, #E9C46A 0%, #F4A261 50%, #E76F51 100%);
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(38, 70, 83, 0.15);
            max-width: 100%;
          }
          .content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 3px 15px rgba(38, 70, 83, 0.1);
          }
          .logo {
            font-size: 36px;
            margin-bottom: 15px;
            animation: float 3s ease-in-out infinite;
          }
          .title {
            color: #264653;
            font-size: 24px;
            margin-bottom: 15px;
            line-height: 1.2;
            font-weight: 700;
          }
          .message {
            color: #264653;
            margin-bottom: 20px;
            line-height: 1.5;
            font-size: 14px;
            text-align: left;
          }
          .highlight {
            color: #E76F51;
            font-weight: 700;
            background: linear-gradient(135deg, #E9C46A, #F4A261);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .steps-container {
            background: linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%);
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #2A9D8F;
          }
          .steps-title {
            color: #2A9D8F;
            font-weight: 700;
            margin-bottom: 10px;
            font-size: 15px;
          }
          ul {
            padding-left: 20px;
            margin: 10px 0;
          }
          li {
            margin-bottom: 8px;
            font-size: 14px;
            position: relative;
          }
          li::marker {
            color: #2A9D8F;
          }
          .footer {
            margin-top: 20px;
            padding: 15px;
            background: linear-gradient(135deg, #264653 0%, #2A9D8F 100%);
            color: white;
            border-radius: 8px;
            font-size: 12px;
          }
          .footer strong {
            color: #E9C46A;
          }
          .emergency {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border: 2px solid #E76F51;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            animation: urgentPulse 2s infinite;
          }
          .emergency h3 {
            color: #E76F51;
            margin: 0 0 10px 0;
            font-size: 16px;
            font-weight: 700;
          }
          .emergency p {
            margin: 8px 0;
            font-size: 13px;
            color: #264653;
          }
          .emergency strong {
            color: #E76F51;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes urgentPulse {
            0% { box-shadow: 0 0 0 0 rgba(231, 111, 81, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(231, 111, 81, 0); }
            100% { box-shadow: 0 0 0 0 rgba(231, 111, 81, 0); }
          }
          @media screen and (max-width: 480px) {
            body { padding: 5px; }
            .container { padding: 10px; }
            .content { padding: 15px; }
            .title { font-size: 22px; }
            .logo { font-size: 32px; }
            .message { font-size: 13px; }
            .emergency { padding: 12px; }
            .steps-container { padding: 12px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="logo">🧠💫</div>
            <h1 class="title">Thank You, ${name}!</h1>
            
            <div class="message">
              <p>I've received your message regarding <span class="highlight">"${subject}"</span> and truly appreciate you reaching out to Mind Mastery Psychology.</p>
              
              <p>Your mental wellness journey is important to me, and I'm committed to providing you with the personalized support and care you deserve.</p>
              
              <div class="steps-container">
                <div class="steps-title">What happens next:</div>
                <ul style="text-align: left; display: block;">
                  <li>I'll review your message with careful attention</li>
                  <li>You'll receive a personal response within <span class="highlight">24 hours</span></li>
                  <li>We can schedule a consultation if appropriate</li>
                  <li>All communications remain strictly confidential</li>
                </ul>
              </div>
            </div>
            
            ${subject === 'emergency' ? `
            <div class="emergency">
              <h3>🚨 Important - Emergency Support</h3>
              <p><strong>If you're experiencing a mental health crisis, please don't wait for my response.</strong></p>
              <p>Call <strong>988</strong> for immediate crisis support or <strong>911</strong> for emergency services.</p>
              <p>Your safety and wellbeing are the top priority.</p>
            </div>
            ` : ''}
            
            <div class="footer">
              <p><strong>IdhreesBashir, Honours in Psychology</strong>
              <br>Psychologist<br>
              NeuronicheAcademy</p>
              <p>📧 rj.sufiidrees@gmail.com | 📞 +917889831747</p>
              
              <p style="margin-top: 15px; opacity: 0.8;"><em>This is an automated response. Please do not reply to this email directly.</em></p>
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
      subject: "Thank you for contacting IdreesBashir - NeuronicheAcademy",
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