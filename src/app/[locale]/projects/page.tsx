import type { Locale } from "../../../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import ProjectsSection from "@/components/projects-section"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Vitaliy Voloshyn",
  description: "Explore projects by Vitaliy Voloshyn - Web applications, Django backends, and React frontends",
}

export default async function ProjectsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <main className="flex min-h-screen flex-col">
      <ProjectsSection locale={locale} />
      <Footer locale={locale} dict={dict} profile={profile} />
    </main>
  )
}
