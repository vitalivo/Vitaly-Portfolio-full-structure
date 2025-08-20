import type { Locale } from "../../../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import BlogSection from "@/components/blog-section"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Vitaliy Voloshyn",
  description: "Technical blog posts and insights by Vitaliy Voloshyn",
}

export default async function BlogPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  return (
    <main className="flex min-h-screen flex-col">
      <BlogSection locale={locale} />
      <Footer locale={locale} dict={dict} profile={profile} />
    </main>
  )
}
