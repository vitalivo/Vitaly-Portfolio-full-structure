"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { CalendarIcon, ClockIcon, EyeIcon, UserIcon, StarIcon } from "lucide-react"

interface BlogPostCardProps {
  post: BlogPost
  locale: Locale
}

export default function BlogPostCard({ post, locale }: BlogPostCardProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const localizedTitle = getLocalizedText(post, "title")
  const localizedSubtitle = getLocalizedText(post, "subtitle")
  const localizedExcerpt = getLocalizedText(post, "excerpt")

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    const validLocales = ["en", "ru", "he"]
    const effectiveLocale = validLocales.includes(locale) ? locale : "en"
    return new Intl.DateTimeFormat(effectiveLocale, { year: "numeric", month: "short", day: "numeric" }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      case "archived":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card className="group flex flex-col h-full overflow-hidden shadow-lg md:hover:shadow-2xl transition-all duration-300 md:transform md:hover:-translate-y-2 border-0 bg-white">
      <div className="relative w-full h-48 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail || "/placeholder.svg"}
            alt={localizedTitle}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 md:group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-6xl opacity-20">📝</div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className={`${getStatusColor(post.status)} text-white border-0`}>{post.status_display}</Badge>
        </div>

        {post.is_featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-yellow-500 text-white border-0">
              <StarIcon className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-bold text-gray-800 md:group-hover:text-blue-600 transition-colors line-clamp-2">
          {localizedTitle}
        </CardTitle>
        {localizedSubtitle && (
          <CardDescription className="text-gray-600 font-medium line-clamp-1">{localizedSubtitle}</CardDescription>
        )}
        <CardDescription className="text-gray-500 line-clamp-3">{localizedExcerpt}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((category) => (
            <Badge
              key={category.id}
              variant="secondary"
              className="text-xs"
              style={{ backgroundColor: category.color + "20", color: category.color }}
            >
              {getLocalizedText(category, "name")}
            </Badge>
          ))}
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag.id}
              variant="outline"
              className="text-xs"
              style={{ borderColor: tag.color, color: tag.color }}
            >
              {tag.name}
            </Badge>
          ))}
          {(post.categories.length > 2 || post.tags.length > 3) && (
            <Badge variant="outline" className="text-xs">
              +{Math.max(0, post.categories.length - 2) + Math.max(0, post.tags.length - 3)} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{post.read_time} min</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{post.views_count}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <UserIcon className="w-4 h-4" />
          <span>By {post.author_name || "Unknown Author"}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/${locale}/blog/${post.slug}`} className="w-full">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
