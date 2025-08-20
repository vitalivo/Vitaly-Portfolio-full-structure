import type { Locale } from "../../../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import SkillsSection from "@/components/skills-section"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills - Vitaliy Voloshyn",
  description:
    "Technical skills of Vitaliy Voloshyn - Python, Django, JavaScript, React, CSS, HTML, SQL, Docker, Linux",
}

export default async function SkillsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <main className="flex min-h-screen flex-col">
      <SkillsSection locale={locale} />
      <Footer locale={locale} dict={dict} profile={profile} />
    </main>
  )
}
