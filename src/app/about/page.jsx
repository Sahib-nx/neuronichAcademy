'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  const qualifications = [
    {
      title: "Honours in Psychology",
      institution: "Indira Gandhi National Open University",
      year: "2021",
      description: "Focused on scientific study of mind, behaviour, and research in psychology."
    },
    {
      title: "Clinical Psychologist",
      institution: "Friends Hospital, Tengpora Bridge, Batmaloo, Srinagar",
      year: "Oct 2024 - Dec 2024",
      description: "Diagnosed and managed clients with anxiety disorders, general depression, OCD, ROCD, substance abuse, bipolar disorder, and PTSD. Has treated clients with self-harm and suicidal tendencies. Has treated students with mental health problems (depression, substance abuse, withdrawal, anxiety disorders, self-harm tendencies.) Has treated clients from diverse and strict cultural backgrounds and social statuses."
    },
    {
      title: "Volunteer & Life Member",
      institution: "Indian Red Cross Society",
      year: "2023",
      description: "Volunteer, Trained First Aid Professional & Life Member. Certified in First Aid, equipped to provide immediate lifesaving assistance in emergency. Committed to humanitarian service through disaster relief, health drives and community."
    }
  ]

  const values = [
    {
      icon: "🧠",
      title: "Evidence-Based Practice",
      description: "All therapeutic approaches are grounded in scientific research and proven methodologies."
    },
    {
      icon: "🤝",
      title: "Compassionate Care",
      description: "Every client receives personalized attention in a safe, non-judgmental environment."
    },
    {
      icon: "🌱",
      title: "Holistic Growth",
      description: "Focus on mental, emotional, and spiritual well-being for complete healing."
    },
    {
      icon: "🎯",
      title: "Goal-Oriented Therapy",
      description: "Collaborative treatment planning with clear, measurable outcomes."
    }
  ]

  const specialties = [
    "Anxiety & Depression",
    "Trauma & PTSD",
    "Relationship Issues",
    "Stress Management",
    "Life Transitions",
    "Mindfulness Training"
  ]

  return (
    <div className="relative min-h-screen overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Peaceful gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E76F51]/10 via-transparent to-[#F4A261]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E9C46A]/20 via-transparent to-[#264653]/30"></div>
        
        {/* Therapeutic animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#2A9D8F]/15 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#E9C46A]/15 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 10,
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
            <span className="bg-gradient-to-r from-[#2A9D8F] via-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
            Dedicated to empowering minds and transforming lives through 
            <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-medium"> evidence-based psychology</span>
          </p>
        </motion.div>

        {/* Biography Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="order-2 lg:order-1">
            <motion.h2
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 xs:mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent">
                My Journey
              </span>
            </motion.h2>
            
            <motion.div
              className="space-y-4 xs:space-y-6 sm:space-y-8 text-sm xs:text-base sm:text-lg lg:text-xl text-[#F5F5F5]/90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                With 5 years of dedicated experience in psychology, I have committed myself to the mission of supporting mental health and well-being. My passion for psychology began in 2021, when I recognized how deeply mental health shapes every aspect of human life and how professional guidance can transform an individual's path.
              </p>
              
              <p>
                Since then, I have worked with a wide range of people—from students under <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-medium">academic pressure to individuals struggling with anxiety, depression, PTSD, OCD, and schizophrenia.</span> My therapeutic approach primarily draws from Cognitive Behavioral Therapy (CBT) and other evidence-based methods, while also embracing holistic perspectives that foster resilience and balance.
              </p>
              
              <p>
                I firmly believe that every person carries within them the strength to heal, grow, and thrive, no matter how heavy their struggles may seem. My role is to provide a safe, supportive, and understanding space where that potential can emerge naturally.
              </p>

              <p>
                Through <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-medium">Neuroniche Academy</span>, my vision is to extend this support to every individual in need, ensuring that no one has to face mental challenges alone.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-[#2A9D8F]/20 via-[#E9C46A]/20 to-[#F4A261]/20 rounded-3xl backdrop-blur-sm border border-[#F5F5F5]/10 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for doctor image */}
                <div className="w-full h-full bg-gradient-to-br from-[#E9C46A]/30 to-[#2A9D8F]/30 rounded-3xl flex items-center justify-center">
                  <div className="text-6xl xs:text-7xl sm:text-8xl lg:text-9xl"><Image src="/img2.png" width={400} height={400} alt='image' /></div>
                </div>
                
                {/* Animated border */}
                <motion.div 
                  className="absolute inset-0 border-2 border-[#E9C46A]/50 rounded-3xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-2 -left-2 w-4 h-4 xs:w-6 xs:h-6 bg-gradient-to-br from-[#2A9D8F] to-[#E9C46A] rounded-full"
                animate={{ 
                  y: [-3, 3, -3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-2 -right-2 w-3 h-3 xs:w-5 xs:h-5 bg-gradient-to-br from-[#E9C46A] to-[#F4A261] rounded-full"
                animate={{ 
                  y: [3, -3, 3],
                  scale: [1.1, 1, 1.1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Specialties Section */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
              Areas of Expertise
            </span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/60 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-2xl p-3 xs:p-4 sm:p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(233, 196, 106, 0.2)"
                }}
              >
                <p className="text-xs xs:text-sm sm:text-base lg:text-lg font-semibold text-[#F5F5F5]/90">
                  {specialty}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Qualifications Section */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent">
              Qualification and Experience
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/60 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-4 xs:p-6 sm:p-8 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(42, 157, 143, 0.15)"
                }}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3 xs:mb-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#F5F5F5] group-hover:text-[#E9C46A] transition-colors duration-300">
                      {qual.title}
                    </h3>
                    <span className="text-sm xs:text-base font-semibold bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
                      {qual.year}
                    </span>
                  </div>
                  
                  <p className="text-sm xs:text-base sm:text-lg font-medium text-[#F4A261] mb-2 xs:mb-3">
                    {qual.institution}
                  </p>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-[#F5F5F5]/80 leading-relaxed">
                    {qual.description}
                  </p>
                </div>
                
                {/* Animated background gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#2A9D8F]/5 to-[#E9C46A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ 
                    background: [
                      "linear-gradient(to bottom right, rgba(42, 157, 143, 0.05), rgba(233, 196, 106, 0.05))",
                      "linear-gradient(to bottom right, rgba(233, 196, 106, 0.05), rgba(244, 162, 97, 0.05))",
                      "linear-gradient(to bottom right, rgba(244, 162, 97, 0.05), rgba(42, 157, 143, 0.05))"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="bg-gradient-to-r from-[#E9C46A] to-[#2A9D8F] bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#264653]/80 to-[#2A9D8F]/60 backdrop-blur-sm border border-[#F5F5F5]/10 rounded-3xl p-4 xs:p-6 sm:p-8 text-center relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(244, 162, 97, 0.2)"
                }}
              >
                <div className="relative z-10">
                  <div className="text-3xl xs:text-4xl sm:text-5xl mb-3 xs:mb-4 sm:mb-6">
                    {value.icon}
                  </div>
                  
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-2 xs:mb-3 sm:mb-4 group-hover:text-[#E9C46A] transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-[#F5F5F5]/80 leading-relaxed">
                    {value.description}
                  </p>
                </div>
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#E9C46A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    opacity: [0, 0.1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}