"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import ProjectCard from "./project-card"
import type { Project } from "@/lib/types"
import type { Locale } from "../../i18n-config"

interface ProjectsContentProps {
  dict: any
  projects: Project[]
  locale: Locale
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, // сократил duration с 0.6 до 0.4
}

export default function ProjectsContent({ dict, projects, locale }: ProjectsContentProps) {
  const [showAll, setShowAll] = useState(false)
  const INITIAL_PROJECTS_COUNT = 6

  const displayedProjects = useMemo(() => {
    return showAll ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT)
  }, [projects, showAll])

  const hasMoreProjects = projects.length > INITIAL_PROJECTS_COUNT

  return (
    <div className="container px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }} // сократил staggerChildren с 0.15 до 0.1
      >
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.header.projects}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.projects.description}
          </p>
        </motion.div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} locale={locale} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <div className="py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📁</span>
              </div>
              <p className="text-lg font-medium">{dict.projects.no_projects_found}</p>
            </div>
          </div>
        )}
      </div>

      {hasMoreProjects && !showAll && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => setShowAll(true)}
            variant="outline"
            size="lg"
            className="px-8 py-3 text-base font-medium transition-all duration-200 hover:bg-blue-50 hover:border-blue-300"
          >
            {locale === "en" && `Show All Projects (${projects.length - INITIAL_PROJECTS_COUNT} more)`}
            {locale === "ru" && `Показать все проекты (еще ${projects.length - INITIAL_PROJECTS_COUNT})`}
            {locale === "he" && `הצג את כל הפרויקטים (עוד ${projects.length - INITIAL_PROJECTS_COUNT})`}
          </Button>
        </div>
      )}
    </div>
  )
}
