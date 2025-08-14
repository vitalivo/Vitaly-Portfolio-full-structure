"use client"

import Link from "next/link"
import { LinkedinIcon, GithubIcon, MailIcon, PhoneIcon } from "lucide-react"
import type { Locale } from "../../i18n-config"
import type { Profile } from "@/lib/types"

interface FooterProps {
  locale: Locale
  dict: any
  profile?: Profile | null
}

export default function Footer({ locale, dict, profile }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                V
              </div>
              <span className="font-bold text-lg">{profile?.full_name || "Vitaliy Voloshyn"}</span>
            </div>
            <p className="text-gray-400 text-sm">{dict?.footer?.brand_description || "Fullstack Junior Developer"}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{dict?.footer?.quick_links || "Quick Links"}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href={`/${locale}#about`} className="text-gray-400 hover:text-white transition-colors text-sm">
                {dict?.header?.about || "About"}
              </Link>
              <Link href={`/${locale}#experience`} className="text-gray-400 hover:text-white transition-colors text-sm">
                {dict?.header?.experience || "Experience"}
              </Link>
              <Link href={`/${locale}#skills`} className="text-gray-400 hover:text-white transition-colors text-sm">
                {dict?.header?.skills || "Skills"}
              </Link>
              <Link href={`/${locale}#projects`} className="text-gray-400 hover:text-white transition-colors text-sm">
                {dict?.header?.projects || "Projects"}
              </Link>
              <Link
                href={`/${locale}#certificates`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {dict?.header?.certificates || "Certificates"}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{dict?.footer?.contact_info || "Contact"}</h3>
            <div className="space-y-2">
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <MailIcon className="w-4 h-4" />
                  <span>{profile.email}</span>
                </Link>
              )}
              {profile?.phone && (
                <Link
                  href={`tel:${profile.phone}`}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{dict?.footer?.follow_me || "Follow Me"}</h3>
            <div className="flex space-x-4">
              {profile?.linkedin_url && (
                <Link
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </Link>
              )}
              {profile?.github_url && (
                <Link
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {profile?.full_name || "Vitaliy Voloshyn"}.{" "}
            {dict?.footer?.rights_reserved || "All rights reserved."}
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            {dict?.footer?.built_with || "Built with Next.js, TypeScript & Tailwind CSS"}
          </p>
        </div>
      </div>
    </footer>
  )
}
