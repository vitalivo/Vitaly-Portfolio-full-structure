import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchExperience } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import ExperienceContent from "./experience-content"

interface ExperienceSectionProps {
  locale: Locale
}

export default async function ExperienceSection({ locale }: ExperienceSectionProps) {
  const dict = await getDictionary(locale)
  const experiences = await fetchExperience()

  // getLocalizedText и formatDate теперь будут вычисляться внутри ExperienceContent
  return (
    <SectionWrapper id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <ExperienceContent dict={dict} experiences={experiences} locale={locale} />
    </SectionWrapper>
  )
}
