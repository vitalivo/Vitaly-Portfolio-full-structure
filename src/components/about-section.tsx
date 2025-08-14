import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import AboutContent from "./about-content"

interface AboutSectionProps {
  locale: Locale
}

export default async function AboutSection({ locale }: AboutSectionProps) {
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <SectionWrapper id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <AboutContent dict={dict} profile={profile} locale={locale} />
    </SectionWrapper>
  )
}
