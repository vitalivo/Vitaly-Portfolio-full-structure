import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProjects } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import ProjectsContent from "./projects-content"

interface ProjectsSectionProps {
  locale: Locale
}

export default async function ProjectsSection({ locale }: ProjectsSectionProps) {
  const dict = await getDictionary(locale)
  const projects = await fetchProjects()

  return (
    <SectionWrapper id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <ProjectsContent dict={dict} projects={projects} locale={locale} />
    </SectionWrapper>
  )
}
