// Existing types (Experience, Skill, SkillCategory, Project, Technology, ProjectCategory, ProjectImage, Certificate, BlogCategory, BlogTag, BlogPost, etc.) would be here

export interface Profile {
  id: number
  first_name: string // Изменено: теперь просто first_name
  last_name: string // Изменено: теперь просто last_name
  full_name: string
  birth_date: string
  age: number
  location: string
  email: string
  phone: string
  linkedin_url: string
  github_url: string
  current_title_en: string // Изменено: было position_en
  current_title_ru: string // Изменено: было position_ru
  current_title_he: string // Изменено: было position_he
  bio_en: string
  bio_ru: string
  bio_he: string
  years_management: number
  years_it: number
  team_size_managed: number
  photo: string | null // Изменено: было profile_image
  resume_en: string | null
  resume_ru: string | null
  resume_he: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Experience {
  id: number
  title_en: string
  title_ru: string
  title_he: string
  company_en: string
  company_ru: string
  company_he: string
  start_date: string // YYYY-MM-DD
  end_date: string | null // YYYY-MM-DD or null for current
  description_en: string
  description_ru: string
  description_he: string
}

export interface Skill {
  id: number
  name_en: string
  name_ru: string
  name_he: string
  proficiency_level: number // 1-5 or similar
  skill_type: string // e.g., 'technical', 'soft'
  is_featured: boolean
  slug?: string
  color?: string
  icon?: string
}

export interface SkillCategory {
  id: number
  name_en: string
  name_ru: string
  name_he: string
  skills: Skill[] // Nested skills
}

export interface Technology {
  id: number
  name: string
  slug: string
  color: string
  icon: string
}

export interface ProjectCategory {
  id: number
  name_en: string
  name_ru: string
  name_he: string
  slug: string
}

export interface ProjectImage {
  id: number
  image: string // URL изображения
  caption_en: string
  caption_ru: string
  caption_he: string
  order: number
}

export interface Project {
  id: number
  title_en: string
  title_ru: string
  title_he: string
  slug: string
  description_en: string
  description_ru: string
  description_he: string
  long_description_en: string
  long_description_ru: string
  long_description_he: string
  github_url: string | null
  demo_url: string | null
  video_url: string | null
  thumbnail: string | null // URL миниатюры
  cover_image: string | null // URL обложки
  category: ProjectCategory // Вложенный объект категории
  technologies: Technology[] // Массив вложенных технологий
  project_type: string
  type_display: string // Отображаемое значение project_type
  status: string
  status_display: string // Отображаемое значение status
  year: number
  is_featured: boolean
  order: number
  images: ProjectImage[] // Массив вложенных изображений
  created_at: string
  updated_at: string
}

export interface Certificate {
  id: number
  title_en: string
  title_ru: string
  title_he: string
  issuer: string
  credential_id: string | null
  issue_date: string // YYYY-MM-DD
  expiry_date: string | null // YYYY-MM-DD or null
  description_en: string
  description_ru: string
  description_he: string
  skills_learned_en: string // Comma-separated string
  skills_learned_ru: string // Comma-separated string
  skills_learned_he: string // Comma-separated string
  skills_list_en: string[] // Array of skills
  skills_list_ru: string[] // Array of skills
  skills_list_he: string[] // Array of skills
  certificate_image: string | null // URL изображения
  verify_url: string | null
  certificate_file: string | null // URL файла
  certificate_type: string
  certificate_type_display: string // Display value from Django choices
  score: string | null
  has_distinction: boolean
  is_featured: boolean
  is_expired: boolean // Computed property
  order: number
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: number
  name_en: string
  name_ru: string
  name_he: string
  slug: string
  description_en: string
  description_ru: string
  description_he: string
  color: string
}

export interface BlogTag {
  id: number
  name: string
  slug: string
  color: string
}

export interface BlogPost {
  id: number
  title_en: string
  title_ru: string
  title_he: string
  slug: string
  subtitle_en: string
  subtitle_ru: string
  subtitle_he: string
  excerpt_en: string
  excerpt_ru: string
  excerpt_he: string
  content_en: string
  content_ru: string
  content_he: string
  thumbnail: string | null
  cover_image: string | null
  categories: BlogCategory[] // Nested categories
  tags: BlogTag[] // Nested tags
  author: number // ID автора
  author_name: string // Full name of the author
  status: string
  status_display: string
  is_featured: boolean
  published_at: string | null // Date-time string
  read_time: number // In minutes
  views_count: number
  meta_description_en: string
  meta_description_ru: string
  meta_description_he: string
  created_at: string
  updated_at: string
}

// --- НОВЫЕ ТИПЫ ДЛЯ КОНТАКТОВ ---

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  status: string
  status_display: string
  priority: string
  priority_display: string
  source: string
  user_agent: string
  ip_address: string | null
  reply_message: string
  replied_at: string | null
  created_at: string
  updated_at: string
}

export interface ContactInfo {
  id: number
  email: string
  phone: string
  address: string
  linkedin_url: string
  github_url: string
  telegram_url: string
  twitter_url: string
  working_hours_en: string
  working_hours_ru: string
  working_hours_he: string
  is_available_for_work: boolean
  availability_note_en: string
  availability_note_ru: string
  availability_note_he: string
  created_at: string
  updated_at: string
}

// Тип для отправки нового сообщения (без read-only полей)
export interface ContactMessageCreate {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

// Добавляем тип Locale для удобства
export type Locale = "en" | "ru" | "he"