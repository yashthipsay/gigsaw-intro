"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AppStoreButton } from "@/components/app-store-button"
import { PhoneShowcase } from "@/components/phone-showcase"
import { FeatureCard } from "@/components/feature-card"
import { StatsCounter } from "@/components/stats-counter"
import { AppleIcon, PlayIcon } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { VideoBackground } from "@/components/video-background"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8])
  const springConfig = { mass: 0.5, stiffness: 100, damping: 30 }
  const springScale = useSpring(scale, springConfig)

  const features = [
    { title: "Jam Room Bookings", description: "Find and book rehearsal spaces instantly", icon: "🎸" },
    { title: "Studio Rentals", description: "Professional recording studios on demand", icon: "🎙️" },
    { title: "Equipment Marketplace", description: "Rent or buy quality music gear", icon: "🎹" },
    { title: "Pro Services", description: "Connect with industry professionals", icon: "🎧" },
  ]

  const stats = [
    { value: 50000, label: "Active Musicians" },
    { value: 1000, label: "Available Spaces" },
    { value: 25000, label: "Bookings Made" },
    { value: 4.9, label: "Average Rating", decimal: true },
  ]

  return (
    <main className="relative overflow-hidden">
      
      {/* Video background above particles */}
      <VideoBackground className="fixed inset-0 w-full h-full object-cover -z-20" />

      {/* Header stays on top */}
      <SiteHeader />

      {/* Hero Section (transparent to show video) */}
      <section ref={targetRef} className="relative min-h-screen flex items-center z-10">
        <motion.div style={{ opacity, scale: springScale }} className="container px-4 mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent"
          >
            The Future of Music Space Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Book studios, rent equipment, and connect with pros - all in one app.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <AppStoreButton
              icon={<AppleIcon className="w-8 h-8" />}
              storeName="App Store"
              className="bg-white text-background hover:bg-white/90"
            />
            <AppStoreButton
              icon={<PlayIcon className="w-8 h-8" />}
              storeName="Google Play"
              className="bg-white text-background hover:bg-white/90"
            />
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-8">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-accent"
          >
            ↓ Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* Features Section (opaque to hide video) */}
      <section className="relative bg-gradient-to-r from-purple-200/50 to-transparent backdrop-blur-xl border border-white/20 rounded-lg p-6">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section (transparent to show video) */}
      <section className="py-24 relative z-10">
        <div className="container px-4 mx-auto">
          <PhoneShowcase />
        </div>
      </section>

      {/* Stats and Download Sections (opaque to hide video) */}
      <section className="relative bg-gradient-to-r from-purple-200/50 to-transparent backdrop-blur-xl border border-white/20 rounded-lg p-6 flex flex-col gap-28">
  <div className="container px-4 mx-auto">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      {stats.map((stat, index) => (
        <StatsCounter 
          key={index} 
          value={stat.value} 
          label={stat.label} 
          decimal={stat.decimal} 
          delay={index * 0.1} 
        />
      ))}
    </div>
  </div>

  <div className="container px-4 mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Music Journey?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of musicians already using Gigsaw to elevate their craft.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <AppStoreButton
                icon={<AppleIcon className="w-8 h-8" />}
                storeName="App Store"
                className="bg-accent text-background hover:bg-accent/90"
              />
              <AppStoreButton
                icon={<PlayIcon className="w-8 h-8" />}
                storeName="Google Play"
                className="bg-accent text-background hover:bg-accent/90"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}