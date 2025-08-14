import type {
  Profile,
  Experience,
  SkillCategory,
  Project,
  Certificate,
  BlogCategory,
  BlogTag,
  BlogPost,
  ContactInfo,
  ContactMessageCreate,
} from "./types"

const API_BASE_URL = "https://fullstack-portfolio-new-backend.onrender.com/api/v1"

console.log("API_BASE_URL:", API_BASE_URL)

export async function fetchProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/core/profiles/`)
    console.log("Profile response status:", res.status)
    if (!res.ok) {
      console.error(`Failed to fetch profile: ${res.status} ${res.statusText}`)
      return null
    }
    const data = await res.json()
    console.log("Profile data:", data)
    return data.results && data.results.length > 0 ? data.results[0] : null
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}

export async function fetchExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/core/experiences/`)
    console.log("Experience response status:", res.status)
    if (!res.ok) {
      console.error(`Failed to fetch experience: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    console.log("Experience data:", data)
    return data.results || []
  } catch (error) {
    console.error("Error fetching experience:", error)
    return []
  }
}

export async function fetchSkillCategoriesWithSkills(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills/categories/with_skills/`)
    console.log("Skills response status:", res.status)
    if (!res.ok) {
      console.error(`Failed to fetch skill categories with skills: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    console.log("Skills data:", data)
    return data.results || data || []
  } catch (error) {
    console.error("Error fetching skill categories with skills:", error)
    return []
  }
}

// ИСПРАВЛЕНО: Улучшил функцию fetchProjects
export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio/projects/`, {
      cache: "no-store", // Отключаем кэширование для получения свежих данных
    })
    console.log("Projects response status:", res.status)
    if (!res.ok) {
      console.error(`Failed to fetch projects: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    console.log("Projects data:", data)
    console.log("Projects count:", data.count)
    console.log("Projects results length:", data.results?.length)
    return data.results || []
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio/projects/featured/`)
    if (!res.ok) {
      console.error(`Failed to fetch featured projects: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    return data.results || []
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
}

export async function fetchProjectById(id: number): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio/projects/${id}/`)
    if (!res.ok) {
      console.error(`Failed to fetch project with ID ${id}: ${res.status} ${res.statusText}`)
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error)
    return null
  }
}

export async function fetchCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates/certificates/`)
    console.log("Certificates response status:", res.status)
    if (!res.ok) {
      console.error(`Failed to fetch certificates: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    console.log("Certificates data:", data)
    return data.results || []
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return []
  }
}

export async function fetchFeaturedCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates/certificates/featured/`)
    if (!res.ok) {
      console.error(`Failed to fetch featured certificates: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    return data.results || []
  } catch (error) {
    console.error("Error fetching featured certificates:", error)
    return []
  }
}

export async function fetchCertificateById(id: number): Promise<Certificate | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates/certificates/${id}/`)
    if (!res.ok) {
      console.error(`Failed to fetch certificate with ID ${id}: ${res.status} ${res.statusText}`)
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching certificate with ID ${id}:`, error)
    return null
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/posts/`)
    console.log("Blog posts response status:", res.status)
    if (!res.ok) {
      console.error(`Failed to fetch blog posts: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    console.log("Blog posts data:", data)
    return data.results || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/posts/${slug}/`, {
      cache: "no-store", // Отключаем кэширование для получения свежих данных
    })
    console.log(`Blog post by slug "${slug}" response status:`, res.status)
    if (!res.ok) {
      console.error(`Failed to fetch blog post with slug ${slug}: ${res.status} ${res.statusText}`)
      return null
    }
    const data = await res.json()
    console.log(`Blog post "${slug}" data:`, data)
    return data
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

export async function fetchFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/posts/featured/`)
    if (!res.ok) {
      console.error(`Failed to fetch featured blog posts: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    return data.results || []
  } catch (error) {
    console.error("Error fetching featured blog posts:", error)
    return []
  }
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/categories/`)
    if (!res.ok) {
      console.error(`Failed to fetch blog categories: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    return data.results || data || []
  } catch (error) {
    console.error("Error fetching blog categories:", error)
    return []
  }
}

export async function fetchBlogTags(): Promise<BlogTag[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/tags/`)
    if (!res.ok) {
      console.error(`Failed to fetch blog tags: ${res.status} ${res.statusText}`)
      return []
    }
    const data = await res.json()
    return data.results || data || []
  } catch (error) {
    console.error("Error fetching blog tags:", error)
    return []
  }
}

export async function fetchContactInfo(): Promise<ContactInfo | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/contacts/info/`)
    if (!res.ok) {
      console.error(`Failed to fetch contact info: ${res.status} ${res.statusText}`)
      return null
    }
    const data = await res.json()
    return data.results && data.results.length > 0 ? data.results[0] : null
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return null
  }
}

export async function sendContactMessage(
  message: ContactMessageCreate,
): Promise<{ success: boolean; message: string; id?: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contacts/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(`Failed to send contact message: ${res.status} ${res.statusText}`, data)
      return {
        success: false,
        message: data.message || "Failed to send message. Please try again.",
      }
    }

    return {
      success: true,
      message: data.message || "Message sent successfully!",
      id: data.id,
    }
  } catch (error) {
    console.error("Error sending contact message:", error)
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    }
  }
}