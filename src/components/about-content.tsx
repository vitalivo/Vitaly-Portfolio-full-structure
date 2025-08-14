"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { Profile } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { MapPinIcon, CalendarIcon, BriefcaseIcon, GraduationCapIcon } from "lucide-react"

interface AboutContentProps {
  dict: any
  profile: Profile | null
  locale: Locale
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function AboutContent({ dict, profile, locale }: AboutContentProps) {
  const getLocalizedBio = (profile: Profile | null, currentLocale: Locale) => {
    if (!profile) {
      return dict.profile?.bio_placeholder || "Bio information will be available soon."
    }
    switch (currentLocale) {
      case "ru":
        return profile.bio_ru || profile.bio_en || dict.profile?.bio_placeholder
      case "he":
        return profile.bio_he || profile.bio_en || dict.profile?.bio_placeholder
      default:
        return profile.bio_en || dict.profile?.bio_placeholder
    }
  }

  const localizedBio = getLocalizedBio(profile, locale)

  return (
    <div className="container px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.header?.about || "About Me"}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {localizedBio}
          </p>
        </motion.div>
      </motion.div>

      {profile ? (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={itemVariants}>
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <MapPinIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{dict.about?.location || "Location"}</h3>
                <p className="text-gray-600">{profile.location || "N/A"}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
              <CardContent className="space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CalendarIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{dict.about?.age || "Age"}</h3>
                <p className="text-gray-600">
                  {profile.age || 0} {dict.about?.years_old || "years old"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
              <CardContent className="space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <BriefcaseIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  {dict.about?.management_experience || "Management Experience"}
                </h3>
                <p className="text-gray-600">
                  {profile.years_management || 0}+ {dict.about?.years_plus || "years"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
              <CardContent className="space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCapIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{dict.about?.it_experience || "IT Experience"}</h3>
                <p className="text-gray-600">
                  {profile.years_it || 0}+ {dict.about?.years_plus || "years"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <p className="text-gray-500">Loading profile information...</p>
        </motion.div>
      )}
    </div>
  )
}
