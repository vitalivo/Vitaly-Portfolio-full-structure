import type { Metadata } from "next"
import { getDictionary } from "../../../lib/dictionaries"
import type { Locale } from "../../../i18n-config"
import ExperienceSection from "../../../components/experience-section"
import Footer from "../../../components/footer"
import { fetchProfile } from "../../../lib/api"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: `${dict.header?.experience || "Experience"} - Vitaly Voloshyn`,
    description:
      dict.seo?.experience?.description ||
      "Professional experience and career journey of Vitaly Voloshyn, Fullstack Junior Developer.",
  }
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <main className="min-h-screen flex flex-col">
      <ExperienceSection locale={locale} />
      <Footer locale={locale} dict={dict} profile={profile} />
    </main>
  )
}
