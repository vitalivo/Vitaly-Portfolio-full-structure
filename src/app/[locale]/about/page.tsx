import type { Locale } from "../../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Vitaliy Voloshyn",
  description: "Learn about Vitaliy Voloshyn - Fullstack Junior Developer with 2+ years of experience",
}

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <main className="flex min-h-screen flex-col">
      <AboutSection locale={locale} />
      <Footer locale={locale} dict={dict} profile={profile} />
    </main>
  )
}
