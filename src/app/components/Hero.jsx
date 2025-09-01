'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function Hero() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(280, 280)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create peaceful brain structure with therapeutic colors
    const brainGroup = new THREE.Group()

    // Main brain cortex - smoother, more organic
    const brainGeometry = new THREE.SphereGeometry(1.4, 32, 32)
    
    // Therapeutic brain material with gentle, peaceful animations
    const brainMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        peacefulPulse: { value: 0.3 },
        healingColor: { value: new THREE.Color(0x2A9D8F) },
        warmthColor: { value: new THREE.Color(0xE9C46A) },
        energyColor: { value: new THREE.Color(0xF4A261) },
        grounding: { value: new THREE.Color(0x264653) }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          
          vec3 pos = position;
          
          // Gentle breathing motion for mindfulness
          float breathe = sin(time * 0.8) * 0.02 + sin(time * 1.2) * 0.015;
          pos *= (1.0 + breathe);
          
          // Subtle brain fold simulation
          float folds = sin(position.x * 4.0 + time * 0.5) * 0.008 +
                       cos(position.y * 3.5 + time * 0.3) * 0.006 +
                       sin(position.z * 5.0 + time * 0.4) * 0.005;
          
          pos += normal * folds;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float peacefulPulse;
        uniform vec3 healingColor;
        uniform vec3 warmthColor;
        uniform vec3 energyColor;
        uniform vec3 grounding;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          // Gentle therapeutic waves across the brain
          float healingWave = sin(vPosition.x * 3.0 + time * 1.5) * 0.5 + 0.5;
          float warmthWave = cos(vPosition.y * 2.5 + time * 1.8) * 0.5 + 0.5;
          float energyFlow = sin(vPosition.z * 4.0 + time * 2.2) * 0.5 + 0.5;
          
          // Create peaceful color transitions
          vec3 therapeuticBlend = mix(grounding, healingColor, healingWave);
          therapeuticBlend = mix(therapeuticBlend, warmthColor, warmthWave * 0.7);
          therapeuticBlend = mix(therapeuticBlend, energyColor, energyFlow * 0.4);
          
          // Gentle inner glow for serenity
          float innerPeace = dot(vNormal, vec3(0, 0, 1));
          float glow = pow(1.0 - abs(innerPeace), 2.0) * peacefulPulse;
          therapeuticBlend += glow * warmthColor * 0.5;
          
          // Mindful meditation points (synaptic activity)
          float meditation = step(0.97, sin(vPosition.x * 8.0 + time * 1.0)) * 
                           step(0.96, cos(vPosition.y * 7.0 + time * 1.3)) * 0.3;
          
          if(meditation > 0.0) {
            therapeuticBlend = mix(therapeuticBlend, warmthColor, 0.8);
          }
          
          // Soft alpha for peaceful transparency
          float alpha = 0.88 + sin(time * 1.5) * 0.08;
          
          gl_FragColor = vec4(therapeuticBlend, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })

    // Create main brain
    const mainBrain = new THREE.Mesh(brainGeometry, brainMaterial)
    brainGroup.add(mainBrain)

    // Brain stem - representing grounding and stability
    const stemGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.0, 16)
    const stemMaterial = new THREE.MeshLambertMaterial({
      color: 0x264653,
      transparent: true,
      opacity: 0.8
    })
    const brainStem = new THREE.Mesh(stemGeometry, stemMaterial)
    brainStem.position.y = -1.2
    brainGroup.add(brainStem)

    // Peaceful thought particles - representing positive thoughts
    const thoughtGeometry = new THREE.BufferGeometry()
    const thoughtCount = 60
    const positions = new Float32Array(thoughtCount * 3)
    const thoughtColors = new Float32Array(thoughtCount * 3)
    const sizes = new Float32Array(thoughtCount)
    const speeds = new Float32Array(thoughtCount)

    for (let i = 0; i < thoughtCount; i++) {
      const i3 = i * 3
      
      // Arrange thoughts in gentle orbits around the brain
      const radius = 2.5 + Math.random() * 1.5
      const theta = (i / thoughtCount) * Math.PI * 2 + Math.random() * 0.5
      const phi = Math.random() * Math.PI * 0.8 + 0.2
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.cos(phi) * (Math.random() * 0.5 + 0.5)
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
      
      // Assign therapeutic colors
      const colorType = Math.random()
      if (colorType < 0.3) {
        // Healing teal
        thoughtColors[i3] = 0.16; thoughtColors[i3 + 1] = 0.62; thoughtColors[i3 + 2] = 0.56
      } else if (colorType < 0.6) {
        // Warm yellow
        thoughtColors[i3] = 0.91; thoughtColors[i3 + 1] = 0.77; thoughtColors[i3 + 2] = 0.42
      } else if (colorType < 0.85) {
        // Gentle orange
        thoughtColors[i3] = 0.96; thoughtColors[i3 + 1] = 0.64; thoughtColors[i3 + 2] = 0.38
      } else {
        // Grounding dark teal
        thoughtColors[i3] = 0.15; thoughtColors[i3 + 1] = 0.28; thoughtColors[i3 + 2] = 0.33
      }
      
      sizes[i] = Math.random() * 2.0 + 1.0
      speeds[i] = Math.random() * 0.5 + 0.3
    }

    thoughtGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    thoughtGeometry.setAttribute('thoughtColor', new THREE.BufferAttribute(thoughtColors, 3))
    thoughtGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    thoughtGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))

    const thoughtMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute float speed;
        attribute vec3 thoughtColor;
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = thoughtColor;
          
          vec3 pos = position;
          
          // Gentle orbital motion - like peaceful thoughts flowing
          float angle = time * speed * 0.3;
          mat3 rotY = mat3(
            cos(angle), 0.0, sin(angle),
            0.0, 1.0, 0.0,
            -sin(angle), 0.0, cos(angle)
          );
          pos = rotY * pos;
          
          // Gentle floating motion
          pos.y += sin(time * speed + length(position) * 0.1) * 0.2;
          
          // Peaceful pulsing
          float pulse = sin(time * 2.0 + length(position) * 0.2) * 0.3 + 0.7;
          vAlpha = pulse;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (120.0 / -mvPosition.z) * pulse;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          if (dist > 0.5) discard;
          
          // Soft, glowing appearance for peace
          float alpha = (1.0 - dist * 2.0) * vAlpha * 0.6;
          float softGlow = exp(-dist * 1.5);
          vec3 finalColor = vColor + vec3(softGlow * 0.1);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const thoughts = new THREE.Points(thoughtGeometry, thoughtMaterial)
    scene.add(thoughts)

    // Therapeutic connection lines - neural pathways of healing
    const connectionGeometry = new THREE.BufferGeometry()
    const connectionPositions = []
    const connectionColors = []

    for (let i = 0; i < 15; i++) {
      const start = Math.floor(Math.random() * thoughtCount) * 3
      const end = Math.floor(Math.random() * thoughtCount) * 3
      
      connectionPositions.push(
        positions[start], positions[start + 1], positions[start + 2],
        positions[end], positions[end + 1], positions[end + 2]
      )
      
      // Therapeutic connection colors
      const healingColor = new THREE.Color(0x2A9D8F)
      connectionColors.push(
        healingColor.r, healingColor.g, healingColor.b,
        healingColor.r, healingColor.g, healingColor.b
      )
    }

    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3))
    connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3))

    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })

    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial)
    scene.add(connections)

    scene.add(brainGroup)

    // Therapeutic lighting for a peaceful atmosphere
    const ambientLight = new THREE.AmbientLight(0xE9C46A, 0.4)
    scene.add(ambientLight)

    const healingLight = new THREE.PointLight(0x2A9D8F, 0.8, 40)
    healingLight.position.set(2, 3, 2)
    scene.add(healingLight)

    const warmthLight = new THREE.PointLight(0xF4A261, 0.6, 35)
    warmthLight.position.set(-2, -1, 3)
    scene.add(warmthLight)

    const serenityLight = new THREE.PointLight(0xE9C46A, 0.5, 30)
    serenityLight.position.set(0, 4, -2)
    scene.add(serenityLight)

    camera.position.z = 6

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer

    // Peaceful animation loop
    const animate = (time) => {
      const t = time * 0.001

      // Update brain material uniforms
      if (brainMaterial.uniforms.time) {
        brainMaterial.uniforms.time.value = t
      }

      if (thoughtMaterial.uniforms.time) {
        thoughtMaterial.uniforms.time.value = t
      }

      // Gentle brain rotation - like mindful breathing
      brainGroup.rotation.y = Math.sin(t * 0.2) * 0.3
      brainGroup.rotation.x = Math.sin(t * 0.15) * 0.1
      brainGroup.position.y = Math.sin(t * 0.5) * 0.08

      // Peaceful thought movement
      thoughts.rotation.y = t * 0.05
      thoughts.rotation.x = Math.sin(t * 0.1) * 0.02

      // Gentle connection flow
      connections.rotation.y = -t * 0.02

      // Therapeutic light movement
      healingLight.position.x = Math.sin(t * 0.3) * 2
      warmthLight.position.z = Math.cos(t * 0.25) * 3
      serenityLight.position.x = Math.cos(t * 0.4) * 1.5

      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    // Responsive resize handler
    const handleResize = () => {
      if (mountRef.current) {
        const container = mountRef.current
        const containerRect = container.getBoundingClientRect()
        const size = Math.min(containerRect.width, containerRect.height, 400)
        
        renderer.setSize(size, size)
        camera.aspect = 1
        camera.updateProjectionMatrix()
      }
    }

    window.addEventListener('resize', handleResize)
    setTimeout(handleResize, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      brainMaterial.dispose()
      thoughtMaterial.dispose()
      connectionMaterial.dispose()
      stemMaterial.dispose()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-0">
      {/* Peaceful gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E76F51]/10 via-transparent to-[#F4A261]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#E9C46A]/20 via-transparent to-[#2A9D8F]/20"></div>
        
        {/* Therapeutic gradient orbs */}
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
        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Content with peaceful theme */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 xs:mb-4 sm:mb-6 lg:mb-8 leading-[0.9] xs:leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-[#2A9D8F] via-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent drop-shadow-sm">
                Mind
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#E9C46A] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent">
                Healing
              </span>
            </motion.h1>

            <motion.p
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl text-[#F5F5F5]/90 mb-4 xs:mb-6 sm:mb-8 lg:mb-10 xl:mb-12 font-light leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Discover inner peace and mental wellness through
              <span className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-medium"> therapeutic psychology</span>
            </motion.p>

            <motion.div
              className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center lg:justify-start mb-6 xs:mb-8 sm:mb-10 lg:mb-12 px-2 xs:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.button
                className="px-4 xs:px-6 sm:px-8 lg:px-10 py-2.5 xs:py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-[#2A9D8F] via-[#E9C46A] to-[#F4A261] rounded-full text-[#264653] font-bold text-sm xs:text-base sm:text-lg lg:text-xl shadow-xl xs:shadow-2xl shadow-[#2A9D8F]/20 xs:shadow-[#2A9D8F]/30 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Begin Healing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#E9C46A] via-[#F4A261] to-[#E76F51] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                className="px-4 xs:px-6 sm:px-8 lg:px-10 py-2.5 xs:py-3 sm:py-4 lg:py-5 border-2 xs:border-3 border-transparent rounded-full font-bold text-sm xs:text-base sm:text-lg lg:text-xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(#264653, #264653) padding-box, linear-gradient(45deg, #2A9D8F, #E9C46A) border-box',
                  border: '2px solid transparent'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-gradient-to-r from-[#2A9D8F] to-[#E9C46A] bg-clip-text text-transparent">
                  Explore Peace
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className="text-center lg:text-left px-2 xs:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <p className="bg-gradient-to-r from-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent font-semibold text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl mb-1 xs:mb-2 italic">
                "The quieter you become, the more you are able to hear"
              </p>
              <p className="text-[#F5F5F5]/60 text-xs xs:text-sm sm:text-base lg:text-lg">
                — Dr. Serenity Mind, Therapeutic Psychologist
              </p>
            </motion.div>
          </motion.div>

          {/* Right Animation - Peaceful Brain */}
          <motion.div
            className="flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              <div 
                ref={mountRef} 
                className="w-60 h-60 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[400px] 2xl:h-[400px] relative mx-auto"
                style={{ 
                  filter: 'drop-shadow(0 0 25px rgba(42, 157, 143, 0.4)) drop-shadow(0 0 45px rgba(233, 196, 106, 0.3))' 
                }}
              />
              
              {/* Therapeutic animated rings */}
              <motion.div 
                className="absolute inset-0 border border-[#2A9D8F]/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-3 xs:inset-4 sm:inset-6 lg:inset-4 xl:inset-6 border border-[#E9C46A]/50 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-6 xs:inset-8 sm:inset-12 lg:inset-8 xl:inset-12 border border-[#F4A261]/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Peaceful floating elements */}
              <motion.div 
                className="absolute -top-1 xs:-top-2 sm:-top-3 lg:-top-2 xl:-top-3 -left-1 xs:-left-2 sm:-left-3 lg:-left-2 xl:-left-3 w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6 bg-gradient-to-br from-[#2A9D8F] to-[#E9C46A] rounded-full"
                animate={{ 
                  y: [-4, 4, -4],
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-1 xs:-top-2 sm:-top-3 lg:-top-2 xl:-top-3 -right-1 xs:-right-2 sm:-right-3 lg:-right-2 xl:-right-3 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-5 sm:h-5 lg:w-3 lg:h-3 xl:w-5 xl:h-5 bg-gradient-to-br from-[#E9C46A] to-[#F4A261] rounded-full"
                animate={{ 
                  y: [4, -4, 4],
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-1 xs:-bottom-2 sm:-bottom-3 lg:-bottom-2 xl:-bottom-3 -left-1 xs:-left-2 sm:-left-3 lg:-left-2 xl:-left-3 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-5 sm:h-5 lg:w-3 lg:h-3 xl:w-5 xl:h-5 bg-gradient-to-br from-[#F4A261] to-[#E76F51] rounded-full"
                animate={{ 
                  x: [-3, 3, -3],
                  scale: [1, 1.08, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-1 xs:-bottom-2 sm:-bottom-3 lg:-bottom-2 xl:-bottom-3 -right-1 xs:-right-2 sm:-right-3 lg:-right-2 xl:-right-3 w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6 bg-gradient-to-br from-[#E76F51] to-[#2A9D8F] rounded-full"
                animate={{ 
                  x: [3, -3, 3],
                  y: [-3, 3, -3],
                  rotate: [0, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Peaceful scroll indicator */}
      <motion.div
        className="absolute bottom-3 xs:bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      >
        <motion.div
          className="w-5 h-8 xs:w-6 xs:h-10 sm:w-8 sm:h-12 lg:w-8 lg:h-14 border-2 border-[#F5F5F5]/40 rounded-full flex justify-center relative overflow-hidden"
          animate={{ 
            boxShadow: [
              "0 0 15px rgba(42, 157, 143, 0.4)",
              "0 0 30px rgba(233, 196, 106, 0.5)",
              "0 0 15px rgba(42, 157, 143, 0.4)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 xs:w-1.5 xs:h-4 sm:w-2 sm:h-5 lg:w-2 lg:h-6 bg-gradient-to-b from-[#2A9D8F] to-[#E9C46A] rounded-full mt-1 xs:mt-1.5 sm:mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-[#F5F5F5]/60 text-xs sm:text-sm mt-1.5 xs:mt-2 sm:mt-3 text-center">Discover Peace</p>
      </motion.div>
    </section>
  )
}