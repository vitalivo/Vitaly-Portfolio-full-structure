"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { CalendarIcon, ClockIcon, EyeIcon, UserIcon, ArrowLeftIcon } from "lucide-react"

interface BlogPostContentProps {
  post: BlogPost
  locale: Locale
  dict: any
}

export default function BlogPostContent({ post, locale, dict }: BlogPostContentProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const localizedTitle = getLocalizedText(post, "title")
  const localizedSubtitle = getLocalizedText(post, "subtitle")
  const localizedContent = getLocalizedText(post, "content")

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    const validLocales = ["en", "ru", "he"]
    const effectiveLocale = validLocales.includes(locale) ? locale : "en"
    return new Intl.DateTimeFormat(effectiveLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <article className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        {post.cover_image && (
          <div className="absolute inset-0">
            <Image
              src={post.cover_image || "/placeholder.svg"}
              alt={localizedTitle}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href={`/${locale}#blog`}>
              <Button
                variant="outline"
                className="mb-4 bg-transparent border-white text-white hover:bg-white hover:text-purple-800"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {dict.blog?.back_to_blog || "Back to Blog"}
              </Button>
            </Link>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{localizedTitle}</h1>

            {localizedSubtitle && (
              <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">{localizedSubtitle}</p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>{post.author_name || "Unknown Author"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{post.read_time} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                <span>{post.views_count} views</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {post.categories.map((category) => (
                <Badge key={category.id} className="bg-white/20 text-white border-0 hover:bg-white/30">
                  {getLocalizedText(category, "name")}
                </Badge>
              ))}
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" className="border-white/50 text-white hover:bg-white/20">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: localizedContent }}
            />
          </motion.div>
        </div>
      </section>

      {/* Related Posts Section (Optional) */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{dict.blog?.related_posts || "Related Posts"}</h3>
            <Link href={`/${locale}#blog`}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {dict.blog?.view_all_posts || "View All Posts"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
