import type { Locale } from "../../../../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchBlogPostBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import BlogPostContent from "@/components/blog-post-content"

interface BlogPostPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale)
  const post = await fetchBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <BlogPostContent post={post} locale={locale} dict={dict} />
    </main>
  )
}
