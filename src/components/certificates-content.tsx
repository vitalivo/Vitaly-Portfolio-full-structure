"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import CertificateCard from "./certificate-card"
import type { Certificate } from "@/lib/types"
import type { Locale } from "../../i18n-config"

interface CertificatesContentProps {
  dict: any
  certificates: Certificate[]
  locale: Locale
}

const INITIAL_CERTIFICATES_COUNT = 6

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

export default function CertificatesContent({ dict, certificates, locale }: CertificatesContentProps) {
  const [showAll, setShowAll] = useState(false)

  const displayedCertificates = useMemo(() => {
    if (!certificates || certificates.length === 0) return []
    return showAll ? certificates : certificates.slice(0, INITIAL_CERTIFICATES_COUNT)
  }, [certificates, showAll])

  const hasMoreCertificates = certificates && certificates.length > INITIAL_CERTIFICATES_COUNT

  return (
    <div className="container px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.header.certificates}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.certificates.description}
          </p>
        </motion.div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {displayedCertificates.length > 0 ? (
          displayedCertificates.map((certificate) => (
            <div key={certificate.id}>
              <CertificateCard certificate={certificate} locale={locale} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <div className="py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-lg font-medium">{dict.certificates.no_certificates_found}</p>
            </div>
          </div>
        )}
      </div>

      {hasMoreCertificates && !showAll && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => setShowAll(true)}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
          >
            {dict.common?.show_all || "Show All"}
          </Button>
        </div>
      )}
    </div>
  )
}
