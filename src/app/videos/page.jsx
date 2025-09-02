'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from "react"

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/api/videos")

        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        
        
        // Check if data is an array and handle error responses
        if (data.error) {
          throw new Error(data.error)
        }

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server')
        }

        // Log each video for debugging
        data.forEach((video, index) => {
          console.log(`Video ${index}:`, video)
        })

        setVideos(data)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError(err.message)
        setVideos([]) // Ensure videos is always an array
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Safely generate categories with error handling and better logging
  const categories = ['All', ...new Set(Array.isArray(videos) ? videos.map(video => video?.category).filter(Boolean) : [])]
  
  // Enhanced logging for debugging
  console.log('All videos:', videos)
  console.log('Categories:', categories)
  console.log('Selected category:', selectedCategory)

  // Safely filter videos with error handling and better logging
  const filteredVideos = Array.isArray(videos)
    ? (selectedCategory === 'All'
      ? videos
      : videos.filter(video => video?.category === selectedCategory))
    : []

  console.log('Filtered videos:', filteredVideos)
  console.log('Filtered videos length:', filteredVideos.length)

  const openModal = (video) => {
    if (!video) return
    setSelectedVideo(video)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedVideo(null)
    document.body.style.overflow = 'unset'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Mental Health': 'from-[#264653] to-[#2A9D8F]',
      'Mindfulness': 'from-[#2A9D8F] to-[#E9C46A]',
      'Depression': 'from-[#E9C46A] to-[#F4A261]',
      'Relationships': 'from-[#F4A261] to-[#E76F51]',
      'Stress': 'from-[#E76F51] to-[#264653]',
      'Sleep': 'from-[#2A9D8F] to-[#E76F51]',
      'Trauma': 'from-[#264653] to-[#F4A261]',
      'Self-Esteem': 'from-[#E9C46A] to-[#2A9D8F]',
    }
    return colors[category] || 'from-[#2A9D8F] to-[#E9C46A]'
  }

  const retryFetch = () => {
    setError(null)
    setLoading(true)
    // Re-trigger the useEffect
    const fetchVideos = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/api/videos")

        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server')
        }

        setVideos(data)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError(err.message)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Peaceful gradient background matching contact page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E76F51]/10 via-transparent to-[#F4A261]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E9C46A]/20 via-transparent to-[#264653]/30"></div>

        {/* Therapeutic animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#2A9D8F]/15 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, 0]
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
            opacity: [0.5, 0.2, 0.5],
            y: [0, -20, 0]
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
            <span className="bg-gradient-to-r from-[#E9C46A] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent">
              Educational Videos
            </span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
            Discover insights and techniques for mental wellness through
            <span className="bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent font-medium"> expert-guided video content</span>
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            className="text-center py-16 sm:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/70 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-8 max-w-2xl mx-auto">
              <div className="text-6xl xs:text-7xl sm:text-8xl mb-4 xs:mb-6">⚠️</div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#E76F51] mb-2 xs:mb-4">
                Something went wrong
              </h3>
              <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/70 mb-6">
                {error}
              </p>
              <button
                onClick={retryFetch}
                className="px-6 py-3 bg-gradient-to-r from-[#2A9D8F] via-[#E9C46A] to-[#F4A261] text-[#264653] font-bold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <motion.div
            className="text-center py-16 sm:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/70 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-8 max-w-2xl mx-auto">
              <motion.div
                className="text-6xl xs:text-7xl sm:text-8xl mb-4 xs:mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🎬
              </motion.div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#E9C46A] mb-2 xs:mb-4">
                Loading videos...
              </h3>
              <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/70">
                Please wait while we fetch the latest content.
              </p>
            </div>
          </motion.div>
        )}

        {/* Content - Only show when not loading and no error */}
        {!loading && !error && (
          <>
            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={`category-${category}-${index}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 rounded-full text-xs xs:text-sm sm:text-base font-semibold transition-all duration-300 relative overflow-hidden ${selectedCategory === category
                    ? 'bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] text-[#264653] shadow-lg'
                    : 'bg-[#264653]/80 border border-[#F5F5F5]/20 text-[#F5F5F5]/80 hover:border-[#E9C46A]/50 hover:text-[#E9C46A] hover:bg-[#264653]/90'
                    }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#E9C46A]/20 to-[#F4A261]/20"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Video Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 sm:gap-8"
              layout
            >
              <AnimatePresence mode="wait">
                {filteredVideos.map((video, index) => {
                  // Enhanced validation with better logging
                  if (!video) {
                    console.warn(`Video at index ${index} is null/undefined`)
                    return null
                  }

                  // More flexible ID checking - check for common ID fields
                  const videoId = video.id || video._id || video.videoId || `video-${index}`
                  
                  if (!videoId) {
                    console.warn(`Video at index ${index} has no valid ID:`, video)
                  }

                  console.log(`Rendering video ${index}:`, { 
                    id: videoId, 
                    title: video.title, 
                    category: video.category 
                  })

                  return (
                    <motion.div
                      key={`video-${videoId}-${selectedCategory}-${index}`}
                      className="bg-gradient-to-br from-[#264653]/90 to-[#2A9D8F]/80 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-2xl xs:rounded-3xl overflow-hidden relative group cursor-pointer"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 25px 50px rgba(233, 196, 106, 0.2)"
                      }}
                      onClick={() => openModal(video)}
                      layout
                    >
                      {/* Animated background effects */}
                      <motion.div
                        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E9C46A]/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#F4A261]/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        {video.thumbnail || video.thumbnailUrl ? (
                          <img 
                            src={video.thumbnail || video.thumbnailUrl} 
                            alt={video.title || 'Video thumbnail'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full bg-gradient-to-br from-[#2A9D8F]/30 to-[#E9C46A]/30 flex items-center justify-center" style={{ display: video.thumbnail || video.thumbnailUrl ? 'none' : 'flex' }}>
                          <div className="text-4xl xs:text-5xl sm:text-6xl">🎥</div>
                        </div>

                        {/* Play button overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </motion.div>

                        {/* Duration badge */}
                        <div className="absolute top-2 xs:top-3 right-2 xs:right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="text-xs xs:text-sm font-medium text-white">{video.duration || 'N/A'}</span>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-2 xs:top-3 left-2 xs:left-3">
                          <span className={`px-2 py-1 text-xs xs:text-sm font-bold rounded-full bg-gradient-to-r ${getCategoryColor(video.category)} text-white shadow-lg`}>
                            {video.category || 'Uncategorized'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 xs:p-4 sm:p-6 relative z-10">
                        <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-[#F5F5F5] mb-2 xs:mb-3 group-hover:text-[#E9C46A] transition-colors duration-300 leading-tight">
                          {video.title || 'Untitled Video'}
                        </h3>

                        <p className="text-xs xs:text-sm sm:text-base text-[#F5F5F5]/80 leading-relaxed mb-3 xs:mb-4 line-clamp-2">
                          {video.description || 'No description available'}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs xs:text-sm font-medium text-[#2A9D8F]">
                            👁️ {video.views || 0} views
                          </span>
                          <motion.div
                            className="flex items-center space-x-1 text-[#E9C46A]"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="text-xs xs:text-sm">▶️</span>
                            <span className="text-xs font-medium">Watch</span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>

            {/* No videos found */}
            {filteredVideos.length === 0 && videos.length > 0 && (
              <motion.div
                className="text-center py-16 sm:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/70 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-8 max-w-2xl mx-auto">
                  <div className="text-6xl xs:text-7xl sm:text-8xl mb-4 xs:mb-6">🔍</div>
                  <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#E9C46A] mb-2 xs:mb-4">
                    No videos found
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/70">
                    Try selecting a different category to see more content.
                  </p>
                </div>
              </motion.div>
            )}

            {/* No videos at all */}
            {videos.length === 0 && !loading && !error && (
              <motion.div
                className="text-center py-16 sm:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/70 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-8 max-w-2xl mx-auto">
                  <div className="text-6xl xs:text-7xl sm:text-8xl mb-4 xs:mb-6">📹</div>
                  <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#E9C46A] mb-2 xs:mb-4">
                    No videos available
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/70">
                    Videos will appear here once they're added to the database.
                  </p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-6xl bg-gradient-to-br from-[#264653] to-[#2A9D8F] border border-[#F5F5F5]/20 rounded-2xl xs:rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background effects */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E9C46A]/20 to-transparent rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 xs:top-4 sm:top-6 right-3 xs:right-4 sm:right-6 z-10 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-[#E76F51]/80 hover:bg-[#E76F51] backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video container */}
              <div className="aspect-video">
                {selectedVideo.videoUrl || selectedVideo.url ? (
                  <iframe
                    src={selectedVideo.videoUrl || selectedVideo.url}
                    title={selectedVideo.title || 'Video'}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2A9D8F]/30 to-[#E9C46A]/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎥</div>
                      <p className="text-white/80">Video not available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video info */}
              <div className="p-4 xs:p-6 sm:p-8 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 xs:gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                      <span className={`px-2 xs:px-3 py-1 text-xs xs:text-sm font-bold rounded-full bg-gradient-to-r ${getCategoryColor(selectedVideo.category)} text-white`}>
                        {selectedVideo.category || 'Uncategorized'}
                      </span>
                      <span className="text-xs xs:text-sm text-[#F5F5F5]/60">
                        {selectedVideo.duration || 'N/A'}
                      </span>
                      <span className="text-xs xs:text-sm text-[#E9C46A]">
                        👁️ {selectedVideo.views || 0} views
                      </span>
                    </div>

                    <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-2 xs:mb-3 sm:mb-4 leading-tight">
                      {selectedVideo.title || 'Untitled Video'}
                    </h2>

                    <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/80 leading-relaxed">
                      {selectedVideo.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};