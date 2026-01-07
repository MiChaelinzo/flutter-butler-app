import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface VirtualAssistantProps {
  isActive: boolean
  isSpeaking: boolean
}

export function VirtualAssistant({ isActive, isSpeaking }: VirtualAssistantProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const headRef = useRef<THREE.Mesh | null>(null)
  const eyesRef = useRef<THREE.Group | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x8b5cf6, 2, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x06b6d4, 2, 100)
    pointLight2.position.set(-5, -3, 3)
    scene.add(pointLight2)

    const headGeometry = new THREE.SphereGeometry(1, 32, 32)
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x5b21b6,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.95
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    scene.add(head)
    headRef.current = head

    const eyesGroup = new THREE.Group()
    const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16)
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1
    })

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.3, 0.2, 0.85)
    eyesGroup.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.3, 0.2, 0.85)
    eyesGroup.add(rightEye)

    head.add(eyesGroup)
    eyesRef.current = eyesGroup

    const ringGeometry = new THREE.TorusGeometry(1.5, 0.02, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6
    })
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial)
    ring1.rotation.x = Math.PI / 2
    scene.add(ring1)

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone())
    ring2.rotation.x = Math.PI / 2
    ring2.scale.set(0.8, 0.8, 0.8)
    scene.add(ring2)

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 150
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    let time = 0
    const animate = () => {
      time += 0.01

      if (headRef.current && eyesRef.current) {
        if (isActive) {
          headRef.current.rotation.y = Math.sin(time * 0.5) * 0.3
          headRef.current.rotation.x = Math.cos(time * 0.3) * 0.1
          
          if (isSpeaking) {
            headRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.05)
            eyesRef.current.scale.setScalar(1 + Math.sin(time * 10) * 0.1)
          } else {
            headRef.current.scale.setScalar(1)
            eyesRef.current.scale.setScalar(1)
          }
        } else {
          headRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
          headRef.current.rotation.x = 0
          headRef.current.scale.setScalar(1)
        }
      }

      ring1.rotation.z = time * 0.5
      ring2.rotation.z = -time * 0.7

      particles.rotation.y = time * 0.05
      particles.rotation.x = Math.sin(time * 0.1) * 0.2

      pointLight1.position.x = Math.sin(time) * 5
      pointLight1.position.y = Math.cos(time) * 5

      pointLight2.position.x = Math.cos(time * 0.7) * -5
      pointLight2.position.y = Math.sin(time * 0.7) * -3

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    setIsReady(true)

    const handleResize = () => {
      if (!containerRef.current) return
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
      }
    }
  }, [isActive, isSpeaking])

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
