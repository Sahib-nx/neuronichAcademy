"use client"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from 'framer-motion'

export default function AddVideoPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    duration: "",
    category: "",
    videoUrl: "",
    views: "",
    secret: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // Validate form fields
  const validateForm = useCallback(() => {
    const errors = {}
    
    if (!form.title.trim()) errors.title = "Title is required"
    if (!form.description.trim()) errors.description = "Description is required"
    if (!form.category) errors.category = "Category is required"
    if (!form.videoUrl.trim()) errors.videoUrl = "Video URL is required"
    if (!form.secret.trim()) errors.secret = "Doctor secret is required"
    
    // Validate YouTube URL format
    if (form.videoUrl && !form.videoUrl.includes('youtube.com') && !form.videoUrl.includes('youtu.be')) {
      errors.videoUrl = "Please provide a valid YouTube URL"
    }
    
    return errors
  }, [form])

  // Handle form input changes
  const handleInputChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }))
    }
    
    // Clear general error when user makes changes
    if (submitStatus === 'error') {
      setSubmitStatus(null)
      setErrorMessage("")
    }
  }, [fieldErrors, submitStatus])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setFieldErrors({})
    setSubmitStatus(null)
    setErrorMessage("")
    
    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSubmitStatus('error')
      setErrorMessage("Please fix the highlighted fields")
      // Smooth scroll to top when error appears
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitStatus('success')
        setForm({
          title: "",
          description: "",
          thumbnail: "",
          duration: "",
          category: "",
          videoUrl: "",
          views: "",
          secret: "",
        })
        // Smooth scroll to top when success appears
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.message || data.error || `Server error: ${res.status}`)
        // Smooth scroll to top when error appears
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      setErrorMessage("Network error. Please check your connection and try again.")
      // Smooth scroll to top when error appears
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const dismissMessage = () => {
    setSubmitStatus(null)
    setErrorMessage("")
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-8 sm:py-16 lg:py-20">
      {/* Peaceful gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E76F51]/10 via-transparent to-[#F4A261]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E9C46A]/20 via-transparent to-[#264653]/30"></div>
        
        {/* Therapeutic animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#2A9D8F]/15 to-transparent rounded-full blur-2xl sm:blur-3xl"
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
          className="absolute bottom-1/3 left-1/3 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#E9C46A]/15 to-transparent rounded-full blur-2xl sm:blur-3xl"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 xs:mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#E9C46A] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent">
              Add New Video
            </span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl text-[#F5F5F5]/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
            Share valuable mental health content 
            <span className="bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent font-medium"> with our community</span>
          </p>
        </motion.div>

        {/* Status Messages - Positioned at top of form area */}
        <AnimatePresence mode="wait">
          {submitStatus && (
            <motion.div
              className="max-w-xl mx-auto mb-4 sm:mb-6"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {submitStatus === 'success' ? (
                <motion.div 
                  className="relative p-3 sm:p-4 border-2 border-emerald-400/60 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden"
                  initial={{ scale: 0.9, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                >
                  {/* Subtle success glow */}
                  <div className="absolute inset-0 border border-emerald-300/30 rounded-xl sm:rounded-2xl"></div>
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <motion.div
                        className="text-lg sm:text-xl mt-0.5"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.6, repeat: 1, delay: 0.2 }}
                      >
                        ✅
                      </motion.div>
                      <div>
                        <h3 className="text-emerald-300 font-semibold text-sm sm:text-base">Success!</h3>
                        <p className="text-emerald-200/90 text-xs sm:text-sm leading-relaxed">
                          Video uploaded successfully! It will be reviewed and published soon.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={dismissMessage}
                      className="text-emerald-300/70 hover:text-emerald-200 transition-colors ml-2 sm:ml-4 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="relative p-3 sm:p-4 border-2 border-red-400/60 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden"
                  initial={{ scale: 0.9, y: -10 }}
                  animate={{ scale: 1, y: 0, x: [0, 2, -2, 0] }}
                  transition={{ 
                    scale: { delay: 0.15, duration: 0.3, ease: "easeOut" },
                    y: { delay: 0.15, duration: 0.3, ease: "easeOut" },
                    x: { duration: 0.4, delay: 0.4 }
                  }}
                >
                  {/* Subtle error glow */}
                  <div className="absolute inset-0 border border-red-300/30 rounded-xl sm:rounded-2xl"></div>
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <motion.div
                        className="text-lg sm:text-xl mt-0.5"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3, repeat: 2, delay: 0.2 }}
                      >
                        ❌
                      </motion.div>
                      <div>
                        <h3 className="text-red-300 font-semibold text-sm sm:text-base">Error</h3>
                        <p className="text-red-200/90 text-xs sm:text-sm leading-relaxed">
                          {errorMessage || "Something went wrong. Please try again."}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={dismissMessage}
                      className="text-red-300/70 hover:text-red-200 transition-colors ml-2 sm:ml-4 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-[#264653]/90 to-[#2A9D8F]/80 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-6">
            
            {/* Doctor Secret */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <input
                  type="password"
                  placeholder="Doctor Secret *"
                  className={`w-full bg-[#264653]/50 border rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none transition-all duration-300 ${
                    fieldErrors.secret 
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                      : 'border-[#F5F5F5]/20 focus:border-[#E9C46A] focus:ring-2 focus:ring-[#E9C46A]/20'
                  }`}
                  value={form.secret}
                  onChange={(e) => handleInputChange('secret', e.target.value)}
                />
                {fieldErrors.secret && (
                  <motion.p 
                    className="text-red-400 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {fieldErrors.secret}
                  </motion.p>
                )}
              </div>
            </motion.div>

            <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
              
              {/* Title */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Video Title *"
                  className={`w-full bg-[#264653]/50 border rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none transition-all duration-300 ${
                    fieldErrors.title 
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                      : 'border-[#F5F5F5]/20 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20'
                  }`}
                  value={form.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
                {fieldErrors.title && (
                  <motion.p 
                    className="text-red-400 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {fieldErrors.title}
                  </motion.p>
                )}
              </div>

              {/* Description */}
              <div className="relative">
                <textarea
                  placeholder="Video Description *"
                  className={`w-full bg-[#264653]/50 border rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none transition-all duration-300 min-h-[80px] sm:min-h-[100px] resize-vertical ${
                    fieldErrors.description 
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                      : 'border-[#F5F5F5]/20 focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20'
                  }`}
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
                {fieldErrors.description && (
                  <motion.p 
                    className="text-red-400 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {fieldErrors.description}
                  </motion.p>
                )}
              </div>

              {/* Video URL */}
              <div className="relative">
                <input
                  type="url"
                  placeholder="YouTube Link (embed URL) *"
                  className={`w-full bg-[#264653]/50 border rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none transition-all duration-300 ${
                    fieldErrors.videoUrl 
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                      : 'border-[#F5F5F5]/20 focus:border-[#E9C46A] focus:ring-2 focus:ring-[#E9C46A]/20'
                  }`}
                  value={form.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                />
                {fieldErrors.videoUrl && (
                  <motion.p 
                    className="text-red-400 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {fieldErrors.videoUrl}
                  </motion.p>
                )}
              </div>

              {/* Thumbnail URL */}
              <div className="relative">
                <input
                  type="url"
                  placeholder="Thumbnail Image URL (optional)"
                  className="w-full bg-[#264653]/50 border border-[#F5F5F5]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#E9C46A] focus:ring-2 focus:ring-[#E9C46A]/20 transition-all duration-300"
                  value={form.thumbnail}
                  onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                />
              </div>

              {/* Duration and Views */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  placeholder="Duration (e.g. 12:34)"
                  className="w-full bg-[#264653]/50 border border-[#F5F5F5]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#E76F51] focus:ring-2 focus:ring-[#E76F51]/20 transition-all duration-300"
                  value={form.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Views (e.g. 15.2K)"
                  className="w-full bg-[#264653]/50 border border-[#F5F5F5]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#F5F5F5]/50 focus:outline-none focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20 transition-all duration-300"
                  value={form.views}
                  onChange={(e) => handleInputChange('views', e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full bg-[#264653]/50 border rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
                    fieldErrors.category 
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                      : 'border-[#F5F5F5]/20 focus:border-[#E9C46A] focus:ring-2 focus:ring-[#E9C46A]/20'
                  }`}
                  required
                >
                  <option value="">Select Category *</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Depression">Depression</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Stress">Stress</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Trauma">Trauma</option>
                  <option value="Self-Esteem">Self-Esteem</option>
                </select>
                
                {/* Custom dropdown arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <motion.svg
                    className="w-5 h-5 text-[#E9C46A]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </motion.svg>
                </div>
                
                {fieldErrors.category && (
                  <motion.p 
                    className="text-red-400 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {fieldErrors.category}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D72638] to-[#FF5DA2] text-white font-bold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(215,38,56,0.3)] hover:shadow-[0_0_25px_rgba(215,38,56,0.4)] transition-all duration-300"
              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              disabled={isSubmitting}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    className="flex items-center justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-sm sm:text-base">Uploading...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="submit"
                    className="flex items-center justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>🎥</span>
                    <span className="text-sm sm:text-base">Upload Video</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Shimmer effect */}
              {!isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                  }}
                />
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}