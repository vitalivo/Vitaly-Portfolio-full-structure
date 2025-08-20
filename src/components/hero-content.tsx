"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { Locale } from "../../i18n-config"
import type { Profile } from "@/lib/types"
import { LinkedinIcon, GithubIcon } from "lucide-react"

interface HeroContentProps {
  locale: Locale
  dict: any
  profile: Profile | null
  localizedFirstName: string
  localizedLastName: string
  localizedPosition: string
  localizedBio: string
}

export default function HeroContent({
  locale,
  dict,
  profile,
  localizedFirstName,
  localizedLastName,
  localizedPosition,
  localizedBio,
}: HeroContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
        <motion.div className="space-y-2" variants={itemVariants}>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            {localizedFirstName} {localizedLastName}
          </h1>
          <p className="max-w-[700px] text-xl md:text-2xl text-purple-100 mx-auto lg:mx-0">{localizedPosition}</p>
        </motion.div>
        <motion.p className="max-w-[700px] text-lg md:text-xl text-purple-200 mx-auto lg:mx-0" variants={itemVariants}>
          {localizedBio}
        </motion.p>
        <motion.div
          className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start"
          variants={itemVariants}
        >
          <Link href={`/${locale}/contact`}>
            <Button className="bg-white text-purple-800 hover:bg-gray-100 hover:text-purple-900 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
              {dict.header?.contact || "Contact"}
            </Button>
          </Link>
          <Link href={`/${locale}/projects`}>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-800 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              {dict.header?.projects || "Projects"}
            </Button>
          </Link>
          {profile?.linkedin_url && (
            <Link href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-white text-white hover:bg-white hover:text-purple-800 bg-transparent"
              >
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          )}
          {profile?.github_url && (
            <Link href={profile.github_url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-white text-white hover:bg-white hover:text-purple-800 bg-transparent"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
      <motion.div className="flex justify-center lg:justify-end" variants={itemVariants}>
        <Image
          src={profile?.photo || "/images/foto.jpg"}
          width={400}
          height={400}
          alt={`${localizedFirstName} ${localizedLastName}`}
          className="mx-auto aspect-square overflow-hidden rounded-full object-cover shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  )
}
