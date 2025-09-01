'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: "📞",
      title: "Phone",
      content: "+917889831747",
      description: "Monday - Friday, 9AM - 6PM",
      link: "tel:+917889831747"
    },
    {
      icon: "📧",
      title: "Email",
      content: "neuronicheacademy@gmail.com",
      description: "Response within 24 hours",
      link: "mailto:neuronicheacademy@gmail.com"
    },
    {
      icon: "📍",
      title: "Location",
      content: "123 Wellness Blvd, Suite 456",
      description: "San Francisco, CA 94102",
      link: "https://www.google.com/maps/search/?api=1&query=Habib+Colony+Baghat+Barzulla+Srinagar"
    },
    {
      icon: "🕒",
      title: "Emergency",
      content: "Crisis Hotline: 988",
      description: "24/7 immediate support",
      link: "https://wa.me/917889831747"
    }
  ]

  const faqs = [
    {
      question: "Do you accept insurance?",
      answer: "Yes, I accept most major insurance plans. Please contact our office to verify your coverage."
    },
    {
      question: "What should I expect in my first session?",
      answer: "The first session focuses on understanding your concerns, goals, and developing a personalized treatment plan."
    },
    {
      question: "How long are therapy sessions?",
      answer: "Standard sessions are 50 minutes. Initial consultations may be longer to thoroughly assess your needs."
    },
    {
      question: "Is everything confidential?",
      answer: "Absolutely. All sessions are strictly confidential within the bounds of professional ethical guidelines."
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Same gradient background as Hero */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0a0a1a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D72638]/5 via-transparent to-[#00A6FB]/5"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#FF5DA2]/3 via-transparent to-[#FF9F1C]/3"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#D72638]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#00A6FB]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 xs:mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-[#FF5DA2] via-[#D72638] to-[#FF9F1C] bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
            Ready to begin your journey to mental wellness? 
            <span className="bg-gradient-to-r from-[#00A6FB] to-[#FF5DA2] bg-clip-text text-transparent font-medium"> Let's connect today</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20 lg:mb-24">
          
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-4 xs:p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              
              {/* Animated background effects */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF5DA2]/20 to-transparent rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00A6FB]/20 to-transparent rounded-full blur-xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.h2
                  className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-[#00A6FB] to-[#FF5DA2] bg-clip-text text-transparent">
                    Send a Message
                  </span>
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 xs:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <label htmlFor="name" className="block text-sm xs:text-base font-medium text-[#F5F5F5]/90 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0D0D0D]/50 border border-[#F5F5F5]/20 rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#FF5DA2] focus:ring-2 focus:ring-[#FF5DA2]/20 transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label htmlFor="email" className="block text-sm xs:text-base font-medium text-[#F5F5F5]/90 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0D0D0D]/50 border border-[#F5F5F5]/20 rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 xs:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <label htmlFor="phone" className="block text-sm xs:text-base font-medium text-[#F5F5F5]/90 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#0D0D0D]/50 border border-[#F5F5F5]/20 rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#FF9F1C] focus:ring-2 focus:ring-[#FF9F1C]/20 transition-all duration-300"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <label htmlFor="subject" className="block text-sm xs:text-base font-medium text-[#F5F5F5]/90 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0D0D0D]/50 border border-[#F5F5F5]/20 rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base text-[#F5F5F5] focus:outline-none focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20 transition-all duration-300"
                      >
                        <option value="">Select a topic</option>
                        <option value="consultation">Initial Consultation</option>
                        <option value="therapy">Therapy Session</option>
                        <option value="emergency">Emergency Support</option>
                        <option value="insurance">Insurance Questions</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <label htmlFor="message" className="block text-sm xs:text-base font-medium text-[#F5F5F5]/90 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-[#0D0D0D]/50 border border-[#F5F5F5]/20 rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#FF5DA2] focus:ring-2 focus:ring-[#FF5DA2]/20 transition-all duration-300 resize-vertical"
                      placeholder="Please describe how I can help you..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 xs:px-8 sm:px-10 py-3 xs:py-4 bg-gradient-to-r from-[#D72638] via-[#FF5DA2] to-[#FF9F1C] rounded-full text-[#F5F5F5] font-bold text-sm xs:text-base sm:text-lg shadow-xl shadow-[#D72638]/30 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5DA2] via-[#D72638] to-[#FF9F1C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {!isSubmitting && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#00A6FB]/20 to-[#FF5DA2]/20"
                          animate={{ x: [-100, 300] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                    </button>
                  </motion.div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-xl"
                    >
                      <p className="text-green-400 text-sm xs:text-base font-medium">
                        ✅ Message sent successfully! I'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-xl"
                    >
                      <p className="text-red-400 text-sm xs:text-base font-medium">
                        ❌ Failed to send message. Please try again or call directly.
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-4 xs:space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-[#FF9F1C] to-[#D72638] bg-clip-text text-transparent">
                Contact Info
              </span>
            </h2>

            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target={info.title === "Location" ? "_blank" : "_self"}
                rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                className="block bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-2xl p-4 xs:p-6 relative overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(255, 93, 162, 0.15)"
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-start space-x-3 xs:space-x-4">
                    <div className="text-2xl xs:text-3xl">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base xs:text-lg font-bold text-[#F5F5F5] group-hover:text-[#FF5DA2] transition-colors duration-300">
                        {info.title}
                      </h3>
                      <p className="text-sm xs:text-base font-medium text-[#00A6FB] mt-1">
                        {info.content}
                      </p>
                      <p className="text-xs xs:text-sm text-[#F5F5F5]/70 mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#FF5DA2]/5 to-[#00A6FB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="bg-gradient-to-r from-[#00A6FB] to-[#FF5DA2] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-2xl p-4 xs:p-6 sm:p-8 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 35px rgba(0, 166, 251, 0.1)"
                }}
              >
                <div className="relative z-10">
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold text-[#FF9F1C] mb-2 xs:mb-3 group-hover:text-[#FF5DA2] transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-base text-[#F5F5F5]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D72638]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-gradient-to-r from-[#D72638]/20 to-[#FF5DA2]/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 xs:p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-red-400 mb-3 xs:mb-4">
              🚨 Crisis Support
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/90 leading-relaxed">
              If you're experiencing a mental health emergency, please don't wait for a response. 
              Call <span className="font-bold text-red-400">988</span> for the Suicide & Crisis Lifeline 
              or <span className="font-bold text-red-400">911</span> for immediate emergency services.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}