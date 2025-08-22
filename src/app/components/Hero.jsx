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

    // Create realistic brain structure
    const brainGroup = new THREE.Group()

    // Main brain hemispheres
    const leftHemisphere = new THREE.SphereGeometry(1.2, 24, 24)
    const rightHemisphere = new THREE.SphereGeometry(1.2, 24, 24)

    // Brain material with realistic glow
    const brainMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowIntensity: { value: 0.6 },
        primaryColor: { value: new THREE.Color(0x00A6FB) },
        secondaryColor: { value: new THREE.Color(0xD72638) },
        pulseColor: { value: new THREE.Color(0xFF5DA2) }
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
          
          float noise = sin(position.x * 6.0 + time) * 0.015 +
                       sin(position.y * 5.0 + time * 1.2) * 0.01 +
                       sin(position.z * 8.0 + time * 0.6) * 0.008;
          
          pos += normal * noise;
          
          float breathe = sin(time * 1.2) * 0.03;
          pos *= (1.0 + breathe);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float glowIntensity;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec3 pulseColor;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          float pattern1 = sin(vPosition.x * 10.0 + time * 2.5) * 0.5 + 0.5;
          float pattern2 = sin(vPosition.y * 7.0 + time * 1.8) * 0.5 + 0.5;
          float pattern3 = sin(vPosition.z * 12.0 + time * 3.2) * 0.5 + 0.5;
          
          float neuralActivity = (pattern1 + pattern2 + pattern3) / 3.0;
          
          vec3 color = mix(primaryColor, secondaryColor, neuralActivity);
          color = mix(color, pulseColor, sin(time * 1.8 + neuralActivity * 6.28) * 0.25 + 0.25);
          
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1))), 1.8);
          color += fresnel * glowIntensity;
          
          float synapses = step(0.94, sin(vPosition.x * 15.0 + time * 6.0)) +
                          step(0.96, sin(vPosition.y * 18.0 + time * 4.5)) +
                          step(0.92, sin(vPosition.z * 14.0 + time * 8.0));
          
          if(synapses > 0.0) {
            color += vec3(1.0, 0.7, 0.2) * synapses * 1.5;
          }
          
          gl_FragColor = vec4(color, 0.85);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })

    // Create brain hemispheres
    const leftBrain = new THREE.Mesh(leftHemisphere, brainMaterial.clone())
    const rightBrain = new THREE.Mesh(rightHemisphere, brainMaterial.clone())
    
    leftBrain.position.x = -0.5
    rightBrain.position.x = 0.5
    
    brainGroup.add(leftBrain, rightBrain)

    // Brain stem
    const stemGeometry = new THREE.CylinderGeometry(0.25, 0.35, 1.2, 12)
    const stemMaterial = brainMaterial.clone()
    const brainStem = new THREE.Mesh(stemGeometry, stemMaterial)
    brainStem.position.y = -1.0
    brainGroup.add(brainStem)

    // Neural network particles - Mobile optimized
    const neuronGeometry = new THREE.BufferGeometry()
    const neuronCount = 80 // Reduced for mobile
    const positions = new Float32Array(neuronCount * 3)
    const particleColors = new Float32Array(neuronCount * 3)
    const sizes = new Float32Array(neuronCount)

    for (let i = 0; i < neuronCount; i++) {
      const i3 = i * 3
      
      const radius = 2.2 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.cos(phi)
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
      
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        particleColors[i3] = 0.0; particleColors[i3 + 1] = 0.65; particleColors[i3 + 2] = 0.98
      } else if (colorChoice < 0.6) {
        particleColors[i3] = 1.0; particleColors[i3 + 1] = 0.36; particleColors[i3 + 2] = 0.64
      } else if (colorChoice < 0.8) {
        particleColors[i3] = 0.84; particleColors[i3 + 1] = 0.16; particleColors[i3 + 2] = 0.22
      } else {
        particleColors[i3] = 1.0; particleColors[i3 + 1] = 0.62; particleColors[i3 + 2] = 0.11
      }
      
      sizes[i] = Math.random() * 1.5 + 0.5
    }

    neuronGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    neuronGeometry.setAttribute('particleColor', new THREE.BufferAttribute(particleColors, 3))
    neuronGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const neuronMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 particleColor;
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = particleColor;
          
          vec3 pos = position;
          
          float angle = time * 0.4 + length(position) * 0.08;
          mat3 rotY = mat3(
            cos(angle), 0.0, sin(angle),
            0.0, 1.0, 0.0,
            -sin(angle), 0.0, cos(angle)
          );
          pos = rotY * pos;
          
          float pulse = sin(time * 3.5 + length(position) * 0.4) * 0.4 + 0.6;
          vAlpha = pulse;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (150.0 / -mvPosition.z) * pulse;
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
          
          float alpha = (1.0 - dist * 2.0) * vAlpha;
          float glow = exp(-dist * 2.5);
          vec3 finalColor = vColor + vec3(glow * 0.2);
          
          gl_FragColor = vec4(finalColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const neurons = new THREE.Points(neuronGeometry, neuronMaterial)
    scene.add(neurons)

    // Reduced connections for mobile performance
    const connectionGeometry = new THREE.BufferGeometry()
    const connectionPositions = []

    for (let i = 0; i < 20; i++) {
      const start = Math.floor(Math.random() * neuronCount) * 3
      const end = Math.floor(Math.random() * neuronCount) * 3
      
      connectionPositions.push(
        positions[start], positions[start + 1], positions[start + 2],
        positions[end], positions[end + 1], positions[end + 2]
      )
    }

    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3))

    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00A6FB,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    })

    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial)
    scene.add(connections)

    scene.add(brainGroup)

    // Optimized lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.2)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00A6FB, 0.6, 30)
    pointLight1.position.set(3, 3, 3)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xFF5DA2, 0.4, 30)
    pointLight2.position.set(-3, -2, 3)
    scene.add(pointLight2)

    camera.position.z = 5

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer

    // Animation loop
    const animate = (time) => {
      const t = time * 0.001

      brainGroup.children.forEach(child => {
        if (child.material.uniforms?.time) {
          child.material.uniforms.time.value = t
        }
      })

      if (neuronMaterial.uniforms.time) {
        neuronMaterial.uniforms.time.value = t
      }

      brainGroup.rotation.y = t * 0.15
      brainGroup.rotation.x = Math.sin(t * 0.25) * 0.08
      brainGroup.position.y = Math.sin(t * 0.6) * 0.05

      neurons.rotation.y = t * 0.08
      neurons.rotation.x = Math.sin(t * 0.15) * 0.03

      connections.rotation.y = -t * 0.03

      pointLight1.position.x = Math.sin(t * 0.5) * 3
      pointLight2.position.z = Math.cos(t * 0.4) * 3

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
    setTimeout(handleResize, 100) // Initial resize after mount

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
      neuronMaterial.dispose()
      connectionMaterial.dispose()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-0">
      {/* Responsive gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0a0a1a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D72638]/5 via-transparent to-[#00A6FB]/5"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#FF5DA2]/3 via-transparent to-[#FF9F1C]/3"></div>
        
        {/* Responsive animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#D72638]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-radial from-[#00A6FB]/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Content - Mobile First Typography */}
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
              <span className="bg-gradient-to-r from-[#00A6FB] via-[#FF5DA2] to-[#D72638] bg-clip-text text-transparent drop-shadow-sm">
                Mind
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#FF9F1C] via-[#D72638] to-[#FF5DA2] bg-clip-text text-transparent">
                Mastery
              </span>
            </motion.h1>

            <motion.p
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl text-[#F5F5F5]/90 mb-4 xs:mb-6 sm:mb-8 lg:mb-10 xl:mb-12 font-light leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Unlock the infinite potential of your consciousness through
              <span className="bg-gradient-to-r from-[#FF5DA2] to-[#00A6FB] bg-clip-text text-transparent font-medium"> advanced psychological insights</span>
            </motion.p>

            <motion.div
              className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center lg:justify-start mb-6 xs:mb-8 sm:mb-10 lg:mb-12 px-2 xs:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.button
                className="px-4 xs:px-6 sm:px-8 lg:px-10 py-2.5 xs:py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-[#D72638] via-[#FF5DA2] to-[#FF9F1C] rounded-full text-[#F5F5F5] font-bold text-sm xs:text-base sm:text-lg lg:text-xl shadow-xl xs:shadow-2xl shadow-[#D72638]/20 xs:shadow-[#D72638]/30 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Begin Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF5DA2] via-[#D72638] to-[#FF9F1C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                className="px-4 xs:px-6 sm:px-8 lg:px-10 py-2.5 xs:py-3 sm:py-4 lg:py-5 border-2 xs:border-3 border-transparent rounded-full font-bold text-sm xs:text-base sm:text-lg lg:text-xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(#0D0D0D, #0D0D0D) padding-box, linear-gradient(45deg, #00A6FB, #FF5DA2) border-box',
                  border: '2px solid transparent'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-gradient-to-r from-[#00A6FB] to-[#FF5DA2] bg-clip-text text-transparent">
                  Explore Mind
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className="text-center lg:text-left px-2 xs:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <p className="text-[#FF9F1C] font-semibold text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl mb-1 xs:mb-2 italic">
                "The mind is not a vessel to be filled, but a fire to be kindled"
              </p>
              <p className="text-[#F5F5F5]/60 text-xs xs:text-sm sm:text-base lg:text-lg">
                — Dr. Elena Consciousness, Neuropsychologist
              </p>
            </motion.div>
          </motion.div>

          {/* Right Animation - Fully Responsive Brain */}
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
                  filter: 'drop-shadow(0 0 20px rgba(0, 166, 251, 0.3)) drop-shadow(0 0 40px rgba(255, 93, 162, 0.2))' 
                }}
              />
              
              {/* Responsive animated rings */}
              <motion.div 
                className="absolute inset-0 border border-[#00A6FB]/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-3 xs:inset-4 sm:inset-6 lg:inset-4 xl:inset-6 border border-[#FF5DA2]/40 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-6 xs:inset-8 sm:inset-12 lg:inset-8 xl:inset-12 border border-[#FF9F1C]/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Responsive floating elements */}
              <motion.div 
                className="absolute -top-1 xs:-top-2 sm:-top-3 lg:-top-2 xl:-top-3 -left-1 xs:-left-2 sm:-left-3 lg:-left-2 xl:-left-3 w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6 bg-gradient-to-br from-[#D72638] to-[#FF5DA2] rounded-full"
                animate={{ 
                  y: [-3, 3, -3],
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-1 xs:-top-2 sm:-top-3 lg:-top-2 xl:-top-3 -right-1 xs:-right-2 sm:-right-3 lg:-right-2 xl:-right-3 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-5 sm:h-5 lg:w-3 lg:h-3 xl:w-5 xl:h-5 bg-gradient-to-br from-[#00A6FB] to-[#FF9F1C] rounded-full"
                animate={{ 
                  y: [3, -3, 3],
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-1 xs:-bottom-2 sm:-bottom-3 lg:-bottom-2 xl:-bottom-3 -left-1 xs:-left-2 sm:-left-3 lg:-left-2 xl:-left-3 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-5 sm:h-5 lg:w-3 lg:h-3 xl:w-5 xl:h-5 bg-gradient-to-br from-[#FF9F1C] to-[#D72638] rounded-full"
                animate={{ 
                  x: [-2, 2, -2],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-1 xs:-bottom-2 sm:-bottom-3 lg:-bottom-2 xl:-bottom-3 -right-1 xs:-right-2 sm:-right-3 lg:-right-2 xl:-right-3 w-3 h-3 xs:w-4 xs:h-4 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6 bg-gradient-to-br from-[#FF5DA2] to-[#00A6FB] rounded-full"
                animate={{ 
                  x: [2, -2, 2],
                  y: [-2, 2, -2],
                  rotate: [0, 360]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive scroll indicator */}
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
              "0 0 15px rgba(0, 166, 251, 0.3)",
              "0 0 30px rgba(255, 93, 162, 0.4)",
              "0 0 15px rgba(0, 166, 251, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 xs:w-1.5 xs:h-4 sm:w-2 sm:h-5 lg:w-2 lg:h-6 bg-gradient-to-b from-[#00A6FB] to-[#FF5DA2] rounded-full mt-1 xs:mt-1.5 sm:mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-[#F5F5F5]/60 text-xs sm:text-sm mt-1.5 xs:mt-2 sm:mt-3 text-center">Explore More</p>
      </motion.div>
    </section>
  )
}