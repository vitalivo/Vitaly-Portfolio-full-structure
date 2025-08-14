"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import type { Experience } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { BriefcaseIcon, GraduationCapIcon, BookOpenIcon } from "lucide-react"

interface ExperienceContentProps {
  dict: any
  experiences: Experience[]
  locale: Locale
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function ExperienceContent({ dict, experiences, locale }: ExperienceContentProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return dict.experience.current || "Current"
    }
    const date = new Date(dateString)
    const validLocales = ["en", "ru", "he"]
    const effectiveLocale = validLocales.includes(locale) ? locale : "en"
    return new Intl.DateTimeFormat(effectiveLocale, { year: "numeric", month: "short" }).format(date)
  }

  const getExperienceIcon = (title: string) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("student") || titleLower.includes("студент") || titleLower.includes("סטודנט")) {
      return <GraduationCapIcon className="w-6 h-6" />
    }
    if (titleLower.includes("self") || titleLower.includes("само") || titleLower.includes("אוטו")) {
      return <BookOpenIcon className="w-6 h-6" />
    }
    return <BriefcaseIcon className="w-6 h-6" />
  }

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
            {dict.header.experience}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.experience.description}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div key={exp.id} variants={itemVariants} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

              <div className="md:ml-16">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                        {getExperienceIcon(getLocalizedText(exp, "title"))}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {getLocalizedText(exp, "title")}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-blue-600">
                          {getLocalizedText(exp, "company")}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{getLocalizedText(exp, "description")}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
