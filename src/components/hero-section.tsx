import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import HeroContent from "./hero-content"

interface HeroSectionProps {
  locale: Locale
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const dict = await getDictionary(locale)
  const profile = await fetchProfile()

  const getLocalizedText = (obj: any, keyPrefix: string, fallbackKey: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    return obj?.[localizedKey] || obj?.[`${keyPrefix}_en`] || dict.profile[fallbackKey]
  }

  const localizedFirstName = profile?.first_name || dict.profile.full_name.split(" ")[0] || ""
  const localizedLastName = profile?.last_name || dict.profile.full_name.split(" ")[1] || ""
  const localizedPosition = profile ? getLocalizedText(profile, "current_title", "position") : dict.profile.position
  const localizedBio = profile ? getLocalizedText(profile, "bio", "bio_placeholder") : dict.profile.bio_placeholder

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <HeroContent
          locale={locale}
          dict={dict}
          profile={profile}
          localizedFirstName={localizedFirstName}
          localizedLastName={localizedLastName}
          localizedPosition={localizedPosition}
          localizedBio={localizedBio}
        />
      </div>
    </section>
  )
}
