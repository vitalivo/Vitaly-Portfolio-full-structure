"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GlobeIcon, MenuIcon } from "lucide-react"
import { i18n } from "../../i18n-config"
import type { Locale } from "../../i18n-config"
import type { Profile } from "@/lib/types"
import { useState } from "react"

interface HeaderClientProps {
  locale: Locale
  dict: any
  profile: Profile | null
  localizedName: string
  localizedPosition: string
}

export default function HeaderClient({ locale, dict, profile, localizedName, localizedPosition }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {localizedName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900">{localizedName}</span>
            <span className="text-sm text-gray-600 hidden md:block">{localizedPosition}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href={`/${locale}/about`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.about}
          </Link>
          <Link
            href={`/${locale}/experience`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.experience}
          </Link>
          <Link
            href={`/${locale}/skills`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.skills}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.projects}
          </Link>
          <Link
            href={`/${locale}/certificates`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.certificates}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.blog}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict.header.contact}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                <GlobeIcon className="h-4 w-4 mr-2" />
                {locale.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {i18n.locales.map((lang) => (
                <DropdownMenuItem key={lang}>
                  <Link href={`/${lang}`} className="w-full">
                    {lang.toUpperCase()}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav className="container px-4 py-4 space-y-2">
            <Link
              href={`/${locale}/about`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.about}
            </Link>
            <Link
              href={`/${locale}/experience`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.experience}
            </Link>
            <Link
              href={`/${locale}/skills`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.skills}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.projects}
            </Link>
            <Link
              href={`/${locale}/certificates`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.certificates}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.blog}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.contact}
            </Link>

            {/* Добавлено: Мобильное меню языков */}
            <div className="border-t pt-4 mt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Language</p>
              {i18n.locales.map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    locale === lang ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
