import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import { i18n } from "../../../i18n-config"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Vitaliy Voloshyn - Portfolio",
  description: "Fullstack Junior Developer Portfolio",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params

  return (
    <>
      <Header locale={locale} />
      {children}
    </>
  )
}
