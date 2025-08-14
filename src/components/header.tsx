import type { Locale } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { fetchProfile } from "@/lib/api"
import HeaderClient from "./header-client" // Импортируем клиентский компонент
import type { Profile } from "@/lib/types" // Импортируем тип Profile

interface HeaderProps {
  locale: Locale
}

export default async function Header({ locale }: HeaderProps) {
  const dict = await getDictionary(locale)
  const profile: Profile | null = await fetchProfile()

  // ИСПРАВЛЕНО: Обновляем функции для работы с реальной структурой API
  const getLocalizedProfileName = (profile: Profile, currentLocale: Locale) => {
    // В API у нас просто first_name и last_name (без языковых суффиксов)
    return `${profile.first_name} ${profile.last_name}`
  }

  const getLocalizedPosition = (profile: Profile, currentLocale: Locale) => {
    // ИСПРАВЛЕНО: Используем current_title_* вместо position_*
    switch (currentLocale) {
      case "ru":
        return profile.current_title_ru || profile.current_title_en
      case "he":
        return profile.current_title_he || profile.current_title_en
      default:
        return profile.current_title_en
    }
  }

  const localizedName = profile ? getLocalizedProfileName(profile, locale) : dict.profile.full_name
  const localizedPosition = profile ? getLocalizedPosition(profile, locale) : dict.profile.position

  return (
    <HeaderClient
      locale={locale}
      dict={dict}
      profile={profile}
      localizedName={localizedName}
      localizedPosition={localizedPosition}
    />
  )
}
