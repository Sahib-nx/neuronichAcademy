'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = [
    {
      id: 1,
      title: "Understanding Anxiety: A Complete Guide",
      description: "Learn the science behind anxiety disorders and discover effective coping strategies for daily management.",
      thumbnail: "/api/placeholder/400/225", // Replace with actual thumbnails
      duration: "12:34",
      category: "Mental Health",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w", 
      views: "15.2K"
    },
    {
      id: 2,
      title: "Mindfulness Meditation for Beginners",
      description: "A guided introduction to mindfulness practices that can transform your mental well-being.",
      thumbnail: "/api/placeholder/400/225",
      duration: "18:45",
      category: "Mindfulness",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "8.7K"
    },
    {
      id: 3,
      title: "Breaking Free from Depression",
      description: "Understand depression symptoms and learn evidence-based techniques for recovery and healing.",
      thumbnail: "/api/placeholder/400/225",
      duration: "22:15",
      category: "Depression",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "23.1K"
    },
    {
      id: 4,
      title: "Healthy Relationships: Communication Skills",
      description: "Master the art of effective communication to build stronger, healthier relationships.",
      thumbnail: "/api/placeholder/400/225",
      duration: "16:28",
      category: "Relationships",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "11.4K"
    },
    {
      id: 5,
      title: "Stress Management in the Digital Age",
      description: "Navigate modern stressors and develop resilience in our connected world.",
      thumbnail: "/api/placeholder/400/225",
      duration: "14:52",
      category: "Stress",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "19.8K"
    },
    {
      id: 6,
      title: "Sleep Psychology: Better Rest Tonight",
      description: "Discover the psychological factors affecting sleep and learn techniques for better rest.",
      thumbnail: "/api/placeholder/400/225",
      duration: "20:33",
      category: "Sleep",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "7.3K"
    },
    {
      id: 7,
      title: "Trauma Recovery: A Path to Healing",
      description: "Understanding trauma responses and the journey toward post-traumatic growth.",
      thumbnail: "/api/placeholder/400/225",
      duration: "25:17",
      category: "Trauma",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "31.2K"
    },
    {
      id: 8,
      title: "Building Self-Esteem and Confidence",
      description: "Practical strategies to develop a healthier relationship with yourself and boost confidence.",
      thumbnail: "/api/placeholder/400/225",
      duration: "17:09",
      category: "Self-Esteem",
      videoUrl: "https://www.youtube.com/embed/Sa0BLHoov4w",
      views: "13.6K"
    }
  ]

  const categories = ['All', ...new Set(videos.map(video => video.category))]
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory)

  const openModal = (video) => {
    setSelectedVideo(video)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedVideo(null)
    document.body.style.overflow = 'unset'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Mental Health': 'from-[#D72638] to-[#FF5DA2]',
      'Mindfulness': 'from-[#00A6FB] to-[#FF5DA2]',
      'Depression': 'from-[#FF5DA2] to-[#D72638]',
      'Relationships': 'from-[#FF9F1C] to-[#D72638]',
      'Stress': 'from-[#00A6FB] to-[#FF9F1C]',
      'Sleep': 'from-[#FF5DA2] to-[#00A6FB]',
      'Trauma': 'from-[#D72638] to-[#FF9F1C]',
      'Self-Esteem': 'from-[#FF9F1C] to-[#FF5DA2]',
    }
    return colors[category] || 'from-[#00A6FB] to-[#FF5DA2]'
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Same gradient background as Hero */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0a0a1a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D72638]/5 via-transparent to-[#00A6FB]/5"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#FF5DA2]/3 via-transparent to-[#FF9F1C]/3"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#D72638]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#00A6FB]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 12,
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
            <span className="bg-gradient-to-r from-[#FF9F1C] via-[#FF5DA2] to-[#00A6FB] bg-clip-text text-transparent">
              Educational Videos
            </span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
            Discover insights and techniques for mental wellness through 
            <span className="bg-gradient-to-r from-[#D72638] to-[#FF5DA2] bg-clip-text text-transparent font-medium"> expert-guided video content</span>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 rounded-full text-xs xs:text-sm sm:text-base font-semibold transition-all duration-300 relative overflow-hidden ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#D72638] to-[#FF5DA2] text-[#F5F5F5] shadow-lg'
                  : 'bg-[#1a1a2e]/80 border border-[#F5F5F5]/20 text-[#F5F5F5]/80 hover:border-[#FF5DA2]/50 hover:text-[#FF5DA2]'
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
                  className="absolute inset-0 bg-gradient-to-r from-[#FF5DA2] to-[#D72638] opacity-20"
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
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-2xl xs:rounded-3xl overflow-hidden relative group cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 25px 50px rgba(255, 93, 162, 0.2)"
                }}
                onClick={() => openModal(video)}
                layout
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#FF5DA2]/30 to-[#00A6FB]/30 flex items-center justify-center">
                    {/* Placeholder for thumbnail - replace with actual Image component */}
                    <div className="text-4xl xs:text-5xl sm:text-6xl">🎥</div>
                  </div>
                  
                  {/* Play button overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#D72638] to-[#FF5DA2] rounded-full flex items-center justify-center shadow-2xl">
                      <svg className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </motion.div>

                  {/* Duration badge */}
                  <div className="absolute top-2 xs:top-3 right-2 xs:right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-xs xs:text-sm font-medium text-white">{video.duration}</span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 xs:top-3 left-2 xs:left-3">
                    <span className={`px-2 py-1 text-xs xs:text-sm font-bold rounded-full bg-gradient-to-r ${getCategoryColor(video.category)} text-white shadow-lg`}>
                      {video.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 xs:p-4 sm:p-6">
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-[#F5F5F5] mb-2 xs:mb-3 group-hover:text-[#FF5DA2] transition-colors duration-300 leading-tight">
                    {video.title}
                  </h3>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-[#F5F5F5]/80 leading-relaxed mb-3 xs:mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm font-medium text-[#00A6FB]">
                      👁️ {video.views} views
                    </span>
                    <motion.div 
                      className="flex items-center space-x-1 text-[#FF9F1C]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs xs:text-sm">▶️</span>
                      <span className="text-xs font-medium">Watch</span>
                    </motion.div>
                  </div>
                </div>

                {/* Animated gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#D72638]/5 via-transparent to-[#00A6FB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No videos found */}
        {filteredVideos.length === 0 && (
          <motion.div
            className="text-center py-16 sm:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl xs:text-7xl sm:text-8xl mb-4 xs:mb-6">🔍</div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#F5F5F5]/80 mb-2 xs:mb-4">
              No videos found
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/60">
              Try selecting a different category to see more content.
            </p>
          </motion.div>
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
              className="relative w-full max-w-6xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#F5F5F5]/20 rounded-2xl xs:rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 xs:top-4 sm:top-6 right-3 xs:right-4 sm:right-6 z-10 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-[#D72638]/80 hover:bg-[#D72638] backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              {/* Video container */}
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video info */}
              <div className="p-4 xs:p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 xs:gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                      <span className={`px-2 xs:px-3 py-1 text-xs xs:text-sm font-bold rounded-full bg-gradient-to-r ${getCategoryColor(selectedVideo.category)} text-white`}>
                        {selectedVideo.category}
                      </span>
                      <span className="text-xs xs:text-sm text-[#F5F5F5]/60">
                        {selectedVideo.duration}
                      </span>
                      <span className="text-xs xs:text-sm text-[#00A6FB]">
                        👁️ {selectedVideo.views} views
                      </span>
                    </div>
                    
                    <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-2 xs:mb-3 sm:mb-4 leading-tight">
                      {selectedVideo.title}
                    </h2>
                    
                    <p className="text-sm xs:text-base sm:text-lg text-[#F5F5F5]/80 leading-relaxed">
                      {selectedVideo.description}
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
}