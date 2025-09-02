"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Linkedin, Facebook, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", url: "#", icon: Instagram, color: "hover:text-[#E9C46A]" },
    { name: "LinkedIn", url: "#", icon: Linkedin, color: "hover:text-[#2A9D8F]" },
    { name: "Facebook", url: "#", icon: Facebook, color: "hover:text-[#2A9D8F]" },
    { name: "Twitter", url: "#", icon: Twitter, color: "hover:text-[#F4A261]" },
    { name: "YouTube", url: "#", icon: Youtube, color: "hover:text-[#E76F51]" },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Videos", href: "/videos" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Peaceful gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E76F51]/10 via-transparent to-[#F4A261]/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E9C46A]/20 via-transparent to-[#264653]/30" />
      </div>

      {/* Therapeutic background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-32 h-32 sm:w-48 md:w-56 lg:w-64 bg-gradient-radial from-[#2A9D8F]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-24 h-24 sm:w-40 md:w-48 bg-gradient-radial from-[#E9C46A]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-16">
          {/* Brand */}
          <motion.div
            className="xs:col-span-2 lg:col-span-1 text-center xs:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center xs:justify-start space-x-3 mb-6">
              
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
                  Neurochi
                </span>
             
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
                Academy
              </span>
            </div>
            <p className="text-gray-200/80 mb-6 max-w-xs sm:max-w-sm mx-auto xs:mx-0">
              Nurturing mental wellness and inner peace through compassionate psychology and therapeutic healing approaches.
            </p>
            <div className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-semibold italic">
              "Peace Within, Healing Throughout"
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center xs:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#E9C46A] transition-all duration-300 flex items-center justify-center xs:justify-start group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-125 hidden xs:block" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            className="xs:col-span-2 lg:col-span-1 text-center xs:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text">
              Stay Connected
            </h3>
            <p className="text-gray-300/80 mb-6">Receive peaceful insights and therapeutic guidance for mental wellness.</p>
            <div className="mb-8">
              <div className="flex flex-col xs:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl xs:rounded-l-xl xs:rounded-r-none text-white placeholder-white/50 focus:outline-none focus:border-[#E9C46A] transition"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] rounded-xl xs:rounded-r-xl xs:rounded-l-none text-[#264653] font-semibold hover:shadow-lg transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            <div className="flex justify-center xs:justify-start space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white/70 ${social.color} transition hover:shadow-lg`}
                    title={social.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-amber-100 text-sm">
          <p>© {new Date().getFullYear()} Dr. Mind Psychology. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 lg:mt-0">
            <Link href="#" className="hover:text-[#E9C46A]">Privacy</Link>
            <Link href="#" className="hover:text-[#E9C46A]">Terms</Link>
            <Link href="#" className="hover:text-[#E9C46A]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}