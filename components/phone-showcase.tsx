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

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Variant for mobile fade-in
  const mobileVariant = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
  }

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

  // Transform values for scroll animations for non-mobile devices
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0.8, 0.9, 1, 1, 1]
  )
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [-100, -20, 0, 0, 0]
  )
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [100, 20, 0, 0, 0]
  )
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0, 0.8, 1, 1, 1]
  )

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden"
    >
      {/* Left Column: Brand Logo & Caption */}
      <motion.div 
      className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-md"
      {...(isMobile 
        ? {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, ease: "easeOut" }
          }
        : { style: { x: leftX, opacity: contentOpacity }}
      )}
    >
        <div className="flex items-center space-x-2 justify-center md:justify-start">
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
      className="relative z-10"
      {...(isMobile 
        ? {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
          }
        : { style: { y, scale, x: rightX, opacity: contentOpacity }}
      )}
    >
        <AnimatePresence mode="wait">
        <motion.div
            key={currentIndex}
            initial={{ 
              opacity: 0,
              y: isMobile ? 50 : 0,
              rotateY: isMobile ? 0 : screens[currentIndex].angle - 30 
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotateY: isMobile ? 0 : screens[currentIndex].angle,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{ 
              opacity: 0,
              y: isMobile ? -50 : 0,
              rotateY: isMobile ? 0 : screens[currentIndex].angle + 30 
            }}
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
