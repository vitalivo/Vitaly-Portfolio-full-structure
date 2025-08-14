"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SkillCategory } from "@/lib/types"
import type { Locale } from "../../i18n-config"

interface SkillsContentProps {
  dict: any
  skillCategories: SkillCategory[]
  locale: Locale
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function SkillsContent({ dict, skillCategories, locale }: SkillsContentProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const getProficiencyText = (level: number) => {
    switch (level) {
      case 5:
        return dict.skills?.proficiency_expert || "Expert"
      case 4:
        return dict.skills?.proficiency_advanced || "Advanced"
      case 3:
        return dict.skills?.proficiency_intermediate || "Intermediate"
      case 2:
        return dict.skills?.proficiency_basic || "Basic"
      case 1:
        return dict.skills?.proficiency_beginner || "Beginner"
      default:
        return ""
    }
  }

  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 5:
        return "bg-green-500"
      case 4:
        return "bg-blue-500"
      case 3:
        return "bg-yellow-500"
      case 2:
        return "bg-orange-500"
      case 1:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  console.log("Skills Categories:", skillCategories) // Для отладки

  return (
    <div className="container px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.header?.skills || "Skills"}
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {dict.skills?.description || "The skills and technologies I work with."}
          </p>
        </motion.div>
      </motion.div>

      {skillCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Загружаем навыки...</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    {getLocalizedText(category, "name")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills && category.skills.length > 0 ? (
                    category.skills.map((skill) => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          {/* ИСПРАВЛЕНО: Показываем название навыка */}
                          <span className="font-medium text-gray-700">
                            {skill.name || getLocalizedText(skill, "name")}
                          </span>
                          <Badge
                            variant="secondary"
                            className={`${getProficiencyColor(skill.proficiency_level)} text-white border-0`}
                          >
                            {getProficiencyText(skill.proficiency_level)}
                          </Badge>
                        </div>
                        {/* ИСПРАВЛЕНО: Используем proficiency_percentage из API */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${getProficiencyColor(skill.proficiency_level)}`}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${skill.proficiency_percentage || (skill.proficiency_level / 5) * 100}%`,
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        {/* ИСПРАВЛЕНО: Показываем описание навыка */}
                        {skill.description_ru && (
                          <p className="text-xs text-gray-500 mt-1">{getLocalizedText(skill, "description")}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Навыки не найдены</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
