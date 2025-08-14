import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchBlogPosts } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import BlogContent from "./blog-content"

interface BlogSectionProps {
  locale: Locale
}

export default async function BlogSection({ locale }: BlogSectionProps) {
  const dict = await getDictionary(locale)
  const posts = await fetchBlogPosts()

  return (
    <SectionWrapper id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <BlogContent dict={dict} posts={posts} locale={locale} />
    </SectionWrapper>
  )
}
