"use client"

import { motion } from "framer-motion"
import type React from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  className?: string
  delay?: number
}

const useIsMobile = () => {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05, // Уменьшено с 0.1 до 0.05
    },
  },
}

const mobileSectionVariants = {
  hidden: { opacity: 0 }, // Только opacity, без y-трансформации
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4, // Быстрее для мобильных
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.02, // Минимальная задержка
    },
  },
}

export default function SectionWrapper({ children, id, className, delay = 0 }: SectionWrapperProps) {
  const isMobile = useIsMobile()

  return (
    <motion.section
      id={id}
      className={className}
      variants={isMobile ? mobileSectionVariants : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }} // меньший amount для мобильных
      transition={{ delay }}
    >
      {children}
    </motion.section>
  )
}
