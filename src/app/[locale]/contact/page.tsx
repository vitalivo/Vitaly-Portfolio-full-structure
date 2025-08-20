import type { Locale } from "../../../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Vitaliy Voloshyn",
  description: "Get in touch with Vitaliy Voloshyn - Fullstack Junior Developer",
}

export default async function ContactPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <main className="flex min-h-screen flex-col">
      <ContactSection locale={locale} />
      <Footer locale={locale} dict={dict} profile={profile} />
    </main>
  )
}
