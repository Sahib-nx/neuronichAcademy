'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Videos', href: '/videos' },
    { name: 'Contact', href: '/contact' },
  ]

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileOpen) {
        setMobileOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileOpen])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#264653]/95 backdrop-blur-md border-b border-[#2A9D8F]/30 shadow-lg shadow-[#2A9D8F]/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 xs:h-14 sm:h-16 lg:h-18">
          
          {/* Logo - Responsive */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-1.5 xs:space-x-2">
              
                <span className="text-base xs:text-lg sm:text-xl lg:text-xl font-bold bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">Neuroniche</span>
            
              <span className="text-base xs:text-lg sm:text-xl lg:text-xl font-bold bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
                Academy
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={item.href}
                  className="relative text-[#F5F5F5] hover:text-[#E9C46A] transition-colors duration-300 font-medium text-sm lg:text-base group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button - Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/contact">
                <motion.button
                  className="px-3 py-1.5 lg:px-4 lg:py-2 xl:px-6 xl:py-2 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] rounded-full text-[#264653] font-medium text-sm lg:text-base hover:shadow-lg hover:shadow-[#2A9D8F]/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Session
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 xs:w-7 xs:h-7 relative"
            onClick={(e) => {
              e.stopPropagation()
              setMobileOpen(!mobileOpen)
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className={`w-5 xs:w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 absolute ${
                mobileOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-4px] xs:translate-y-[-5px]'
              }`}
            />
            <motion.span
              className={`w-5 xs:w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <motion.span
              className={`w-5 xs:w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 absolute ${
                mobileOpen ? '-rotate-45 translate-y-0' : 'translate-y-[4px] xs:translate-y-[5px]'
              }`}
            />
          </motion.button>
        </div>

        {/* Mobile Navigation - Improved */}
        <motion.div
          className={`md:hidden overflow-hidden ${mobileOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileOpen ? 1 : 0, 
            height: mobileOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pb-3 xs:pb-4 pt-2 xs:pt-3 space-y-1 xs:space-y-2 border-t border-[#F5F5F5]/10 mt-2 xs:mt-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="block px-3 xs:px-4 py-2 xs:py-2.5 text-[#F5F5F5] hover:text-[#E9C46A] hover:bg-[#F5F5F5]/5 transition-all duration-300 rounded-lg text-sm xs:text-base font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Mobile CTA Button */}
            <motion.div
              className="pt-2 xs:pt-3 px-3 xs:px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : 20 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Link href="/contact">
                <motion.button
                  className="w-full px-4 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] rounded-full text-[#264653] font-medium text-sm xs:text-base shadow-lg shadow-[#2A9D8F]/20 hover:shadow-xl hover:shadow-[#2A9D8F]/30 transition-all duration-300"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMobileOpen(false)}
                >
                  Book Session
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 bg-[#264653]/50 backdrop-blur-sm z-[-1] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </motion.nav>
  )
}