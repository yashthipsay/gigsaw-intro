import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AppStoreButtonProps {
  icon: React.ReactNode
  storeName: string
  className?: string
}

export function AppStoreButton({ icon, storeName, className }: AppStoreButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button className={cn("h-16 px-8 gap-3 text-lg font-semibold", className)}>
        {icon}
        <div className="flex flex-col items-start">
          <span className="text-xs">Download on</span>
          <span>{storeName}</span>
        </div>
      </Button>
    </motion.div>
  )
}

