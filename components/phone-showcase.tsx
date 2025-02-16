import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

export function PhoneShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const screens = [
    { src: "/image-1.jpg", angle: -15 },
    { src: "/image-2.jpg", angle: 0 },
    { src: "/image-3.jpg", angle: 15 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for scroll animations
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0.8, 0.9, 1, 1, 1] // Scales up and maintains size
  )
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [-100, -20, 0, 0, 0] // Slides in from left, stays in position
  )
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [100, 20, 0, 0, 0] // Slides in from right, stays in position
  )
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0, 0.8, 1, 1, 1] // Changed to maintain visibility after fade in
  )

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] flex items-center justify-center gap-4 relative overflow-hidden px-4"
    >
      {/* Left Column: Brand Logo & Caption */}
      <motion.div 
        className="flex flex-col justify-center space-y-4 max-w-md"
        style={{
          x: leftX,
          opacity: contentOpacity
        }}
      >
        <div className="flex items-center space-x-2">
          <Image
            src="/Gigsaw_Icon.png"
            alt="Gigsaw"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-xl font-bold">Gigsaw</span>
        </div>
        <p className="text-3xl md:text-4xl font-extrabold cool-font">
          Built for musicians, by musicians
        </p>
      </motion.div>

      {/* Right Column: Phone Carousel */}
      <motion.div 
        style={{ 
          y, 
          scale,
          x: rightX,
          opacity: contentOpacity
        }} 
        className="relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: screens[currentIndex].angle - 30 }}
            animate={{
              rotateY: screens[currentIndex].angle,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{ rotateY: screens[currentIndex].angle + 30 }}
            className="relative w-[240px] h-[480px] rounded-[3rem] border-8 border-gray-800 overflow-hidden shadow-2xl"
            style={{
              perspective: "1500px",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={screens[currentIndex].src}
              alt={`Gigsaw App Interface ${currentIndex + 1}`}
              width={240}
              height={480}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}