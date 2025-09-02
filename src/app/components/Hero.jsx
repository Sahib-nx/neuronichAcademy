'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-0">
      {/* Peaceful gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E76F51]/10 via-transparent to-[#F4A261]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E9C46A]/20 via-transparent to-[#2A9D8F]/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">

          {/* Content - Mobile First */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight sm:leading-[0.9]">
              <span 
                className={`bg-gradient-to-r from-[#2A9D8F] via-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent drop-shadow-sm inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                Mind
              </span>
              <br />
              <span 
                className={`bg-gradient-to-r from-[#E9C46A] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent inline-block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                Healing
              </span>
            </h1>

            <p className={`text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl text-[#F5F5F5]/90 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 font-light leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Discover inner peace and mental wellness through
              <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-medium">
                {" "}therapeutic psychology
              </span>
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-[#2A9D8F] via-[#E9C46A] to-[#F4A261] rounded-full text-[#264653] font-bold text-base sm:text-lg lg:text-xl shadow-xl relative overflow-hidden group">
                <span className="relative z-10">Begin Healing</span>
              </button>

              <button
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 border-2 rounded-full font-bold text-base sm:text-lg lg:text-xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(#264653, #264653) padding-box, linear-gradient(45deg, #2A9D8F, #E9C46A) border-box',
                  border: '2px solid transparent'
                }}
              >
                <span className="bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
                  Explore Peace
                </span>
              </button>
            </div>

            <div className={`text-center lg:text-left transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-semibold text-sm sm:text-base lg:text-lg xl:text-2xl mb-1 sm:mb-2 italic">
                "The quieter you become, the more you are able to hear"
              </p>
              <p className="text-[#F5F5F5]/60 text-xs sm:text-sm lg:text-base">
                — Dr. Serenity Mind, Therapeutic Psychologist
              </p>
            </div>
          </div>

          {/* Right: Your Original GIF */}
          <div className="flex justify-center order-1 lg:order-2">
            <img
              src="/video.gif"
              alt="Healing brain animation"
              className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[400px] 2xl:h-[400px] rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}