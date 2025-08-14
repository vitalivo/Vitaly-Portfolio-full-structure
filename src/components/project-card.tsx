"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { ExternalLinkIcon, GithubIcon, PlayIcon, VideoIcon, StarIcon } from "lucide-react"
import { useMemo } from "react"

interface ProjectCardProps {
  project: Project
  locale: Locale
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const localizedTitle = useMemo(() => getLocalizedText(project, "title"), [project, locale])
  const localizedDescription = useMemo(() => getLocalizedText(project, "description"), [project, locale])
  const localizedLongDescription = useMemo(() => getLocalizedText(project, "long_description"), [project, locale])

  const statusColor = useMemo(() => {
    switch (project.status) {
      case "live":
        return "bg-green-500"
      case "production":
        return "bg-blue-500"
      case "completed":
        return "bg-purple-500"
      case "in_development":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }, [project.status])

  const typeColor = useMemo(() => {
    switch (project.project_type) {
      case "web_app":
      case "fullstack":
        return "bg-blue-100 text-blue-800"
      case "mobile_app":
      case "mobile":
        return "bg-green-100 text-green-800"
      case "desktop_app":
        return "bg-purple-100 text-purple-800"
      case "api":
        return "bg-orange-100 text-orange-800"
      case "frontend":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [project.project_type])

  // ИСПРАВЛЕНО: Улучшенная логика для GitHub ссылок
  const getGitHubUrl = () => {
    // Если есть прямая ссылка в project.github_url
    if (project.github_url && project.github_url.trim() !== "") {
      return project.github_url
    }

    // Генерируем ссылку на основе slug проекта
    const baseGitHubUrl = "https://github.com/Vitaliy-Voloshyn" // Замените на ваш GitHub username
    return `${baseGitHubUrl}/${project.slug}`
  }

  const getDemoUrl = () => {
    if (project.demo_url && project.demo_url.trim() !== "") {
      return project.demo_url
    }
    return null
  }

  return (
    <Card className="group flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 md:transform md:hover:-translate-y-1 border-0 bg-white">
      <div className="relative w-full h-48 overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail || "/placeholder.svg"}
            alt={localizedTitle}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 md:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-6xl opacity-20">💻</div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className={`${statusColor} text-white border-0`}>{project.status_display}</Badge>
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          {project.is_featured && (
            <Badge className="bg-yellow-500 text-white border-0">
              <StarIcon className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge className={typeColor}>{project.type_display}</Badge>
        </div>
      </div>

      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-bold text-gray-800 md:group-hover:text-blue-600 transition-colors">
          {localizedTitle}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2">{localizedDescription}</CardDescription>
        {localizedLongDescription && (
          <p className="text-sm text-gray-500 line-clamp-3 mt-2">{localizedLongDescription}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech.id} variant="outline" className="text-xs" style={{ borderColor: tech.color }}>
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{project.category ? getLocalizedText(project.category, "name") : "Uncategorized"}</span>
          <span>{project.year}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        {/* GitHub кнопка - всегда показываем */}
        <Link href={getGitHubUrl()} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <GithubIcon className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </Link>

        {/* Demo кнопка - показываем только если есть URL */}
        {getDemoUrl() ? (
          <Link href={getDemoUrl()!} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <PlayIcon className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
            <ExternalLinkIcon className="w-4 h-4 mr-2" />
            Demo Soon
          </Button>
        )}

        {project.video_url && (
          <Link href={project.video_url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="bg-transparent">
              <VideoIcon className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
