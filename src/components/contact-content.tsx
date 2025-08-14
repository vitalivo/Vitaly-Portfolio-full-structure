"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkedinIcon,
  GithubIcon,
  MessageCircleIcon,
  TwitterIcon,
  ClockIcon,
  CheckCircleIcon,
} from "lucide-react"
import Link from "next/link"
import ContactForm from "./contact-form"
import type { ContactInfo, Locale } from "@/lib/types"

interface ContactContentProps {
  locale: Locale
  dict: any
  contactInfo: ContactInfo | null
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function ContactContent({ locale, dict, contactInfo }: ContactContentProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const localizedWorkingHours = contactInfo ? getLocalizedText(contactInfo, "working_hours") : ""
  const localizedAvailabilityNote = contactInfo ? getLocalizedText(contactInfo, "availability_note") : ""

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
            {dict.header.contact}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.contact.description}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-8 lg:grid-cols-2 lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Contact Information */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                {dict.contact.info.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo && (
                <>
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <MailIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      {contactInfo.email}
                    </span>
                  </Link>

                  {contactInfo.phone && (
                    <Link
                      href={`tel:${contactInfo.phone}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                    >
                      <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <PhoneIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 group-hover:text-green-600 transition-colors">
                        {contactInfo.phone}
                      </span>
                    </Link>
                  )}

                  {contactInfo.address && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPinIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-gray-700">{contactInfo.address}</span>
                    </div>
                  )}

                  {localizedWorkingHours && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <ClockIcon className="w-5 h-5 text-gray-500" />
                        <h4 className="font-semibold text-gray-700">{dict.contact.info.working_hours}</h4>
                      </div>
                      <p className="text-gray-600 ml-7">{localizedWorkingHours}</p>
                    </div>
                  )}

                  {contactInfo.is_available_for_work && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-700">{dict.contact.info.available_for_work}</span>
                      </div>
                      {localizedAvailabilityNote && (
                        <p className="text-sm text-gray-600 mt-2 ml-3">{localizedAvailabilityNote}</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          {contactInfo && (
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  {dict.contact.social.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {contactInfo.linkedin_url && (
                    <Link
                      href={contactInfo.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <LinkedinIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">LinkedIn</span>
                    </Link>
                  )}

                  {contactInfo.github_url && (
                    <Link
                      href={contactInfo.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <GithubIcon className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">GitHub</span>
                    </Link>
                  )}

                  {contactInfo.telegram_url && (
                    <Link
                      href={contactInfo.telegram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <MessageCircleIcon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500">Telegram</span>
                    </Link>
                  )}

                  {contactInfo.twitter_url && (
                    <Link
                      href={contactInfo.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <TwitterIcon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-400">Twitter</span>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <ContactForm locale={locale} dict={dict} />
        </motion.div>
      </motion.div>
    </div>
  )
}
