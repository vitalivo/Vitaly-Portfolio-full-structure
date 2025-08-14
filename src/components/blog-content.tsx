"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import BlogPostCard from "./blog-post-card"
import type { BlogPost } from "@/lib/types"
import type { Locale } from "../../i18n-config"

interface BlogContentProps {
  dict: any
  posts: BlogPost[]
  locale: Locale
}

const useIsMobile = () => {
  return useMemo(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  }, [])
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, // сократил duration с 0.6 до 0.4
}

const mobileItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
}

export default function BlogContent({ dict, posts, locale }: BlogContentProps) {
  const [showAll, setShowAll] = useState(false) // добавил состояние для пагинации
  const INITIAL_POSTS_COUNT = 4 // показываем 4 поста изначально
  const isMobile = useIsMobile()

  const displayedPosts = useMemo(() => {
    if (!posts || posts.length === 0) return []
    return showAll ? posts : posts.slice(0, INITIAL_POSTS_COUNT)
  }, [posts, showAll])

  const hasMorePosts = posts && posts.length > INITIAL_POSTS_COUNT

  return (
    <div className="container px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
        variants={{ visible: { transition: { duration: 0.3 } } }}
      >
        <motion.div className="space-y-4" variants={isMobile ? mobileItemVariants : itemVariants}>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.header.blog}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.blog.description}
          </p>
        </motion.div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div key={post.id}>
              <BlogPostCard post={post} locale={locale} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <div className="py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-lg font-medium">{dict.blog.no_posts_found}</p>
            </div>
          </div>
        )}
      </div>

      {hasMorePosts && !showAll && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => setShowAll(true)}
            variant="outline"
            size="lg"
            className="px-8 py-3 text-base font-medium transition-all duration-200 hover:bg-blue-50 hover:border-blue-300"
          >
            {locale === "en" && `Show All Posts (${posts.length - INITIAL_POSTS_COUNT} more)`}
            {locale === "ru" && `Показать все статьи (еще ${posts.length - INITIAL_POSTS_COUNT})`}
            {locale === "he" && `הצג את כל הפוסטים (עוד ${posts.length - INITIAL_POSTS_COUNT})`}
          </Button>
        </div>
      )}
    </div>
  )
}
