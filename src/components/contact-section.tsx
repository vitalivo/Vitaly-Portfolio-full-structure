import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchContactInfo } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import ContactContent from "./contact-content"

interface ContactSectionProps {
  locale: Locale
}

export default async function ContactSection({ locale }: ContactSectionProps) {
  const dict = await getDictionary(locale)
  const contactInfo = await fetchContactInfo()

  // getLocalizedText теперь будет вычисляться внутри ContactContent
  return (
    <SectionWrapper id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <ContactContent dict={dict} contactInfo={contactInfo} locale={locale} />
    </SectionWrapper>
  )
}
