import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchCertificates } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import CertificatesContent from "./certificates-content"

interface CertificatesSectionProps {
  locale: Locale
}

export default async function CertificatesSection({ locale }: CertificatesSectionProps) {
  const dict = await getDictionary(locale)
  const certificates = await fetchCertificates()

  return (
    <SectionWrapper id="certificates" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <CertificatesContent dict={dict} certificates={certificates} locale={locale} />
    </SectionWrapper>
  )
}
