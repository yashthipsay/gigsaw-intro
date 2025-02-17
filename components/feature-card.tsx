"use client"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  delay?: number
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="group relative p-6 rounded-2xl bg-purple-300/20 backdrop-blur-sm border border-purple-200/10 hover:border-purple-300/30 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </motion.div>
  )
}

