import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchSkillCategoriesWithSkills } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import SkillsContent from "./skills-content"

interface SkillsSectionProps {
  locale: Locale
}

export default async function SkillsSection({ locale }: SkillsSectionProps) {
  const dict = await getDictionary(locale)
  const skillCategories = await fetchSkillCategoriesWithSkills()

  // getLocalizedText и getProficiencyText теперь будут вычисляться внутри SkillsContent
  return (
    <SectionWrapper id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <SkillsContent dict={dict} skillCategories={skillCategories} locale={locale} />
    </SectionWrapper>
  )
}
