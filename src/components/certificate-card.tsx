"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Certificate } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { CalendarIcon, ExternalLinkIcon, DownloadIcon, AwardIcon, StarIcon, ShieldCheckIcon } from "lucide-react"

interface CertificateCardProps {
  certificate: Certificate
  locale: Locale
}

export default function CertificateCard({ certificate, locale }: CertificateCardProps) {
  const getLocalizedText = (obj: any, keyPrefix: string) => {
    const localizedKey = `${keyPrefix}_${locale}`
    const fallbackEnKey = `${keyPrefix}_en`
    return obj?.[localizedKey] || obj?.[fallbackEnKey] || ""
  }

  const localizedTitle = getLocalizedText(certificate, "title")
  const localizedDescription = getLocalizedText(certificate, "description")
  const localizedSkills = (certificate as any)[`skills_list_${locale}`] || (certificate as any)["skills_list_en"] || []

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const validLocales = ["en", "ru", "he"]
    const effectiveLocale = validLocales.includes(locale) ? locale : "en"
    return new Intl.DateTimeFormat(effectiveLocale, { year: "numeric", month: "short", day: "numeric" }).format(date)
  }

  const getCertificateTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-800"
      case "certification":
        return "bg-green-100 text-green-800"
      case "diploma":
        return "bg-purple-100 text-purple-800"
      case "workshop":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="group flex flex-col h-full overflow-hidden shadow-lg md:hover:shadow-2xl transition-all duration-300 md:transform md:hover:-translate-y-1 border-0 bg-white">
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        {certificate.certificate_image ? (
          <Image
            src={certificate.certificate_image || "/placeholder.svg"}
            alt={localizedTitle}
            fill
            className="object-cover transition-transform duration-300 md:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-6xl opacity-30">🏆</div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          {certificate.is_featured && (
            <Badge className="bg-yellow-500 text-white border-0">
              <StarIcon className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge className={getCertificateTypeColor(certificate.certificate_type)}>
            {certificate.certificate_type_display}
          </Badge>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          {certificate.has_distinction && (
            <Badge className="bg-green-500 text-white border-0">
              <AwardIcon className="w-3 h-3 mr-1" />
              Distinction
            </Badge>
          )}
          {!certificate.is_expired && (
            <Badge className="bg-blue-500 text-white border-0">
              <ShieldCheckIcon className="w-3 h-3 mr-1" />
              Valid
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="flex-grow">
        <CardTitle className="text-lg font-bold text-gray-800 md:group-hover:text-blue-600 transition-colors line-clamp-2">
          {localizedTitle}
        </CardTitle>
        <CardDescription className="text-blue-600 font-medium">{certificate.issuer}</CardDescription>
        {certificate.credential_id && <p className="text-xs text-gray-500">ID: {certificate.credential_id}</p>}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{formatDate(certificate.issue_date)}</span>
          {certificate.expiry_date && (
            <>
              <span className="mx-2">-</span>
              <span className={certificate.is_expired ? "text-red-500" : ""}>
                {formatDate(certificate.expiry_date)}
              </span>
            </>
          )}
        </div>

        {localizedDescription && <p className="text-sm text-gray-600 line-clamp-3">{localizedDescription}</p>}

        {localizedSkills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Skills Learned:</h4>
            <div className="flex flex-wrap gap-1">
              {localizedSkills.slice(0, 4).map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {localizedSkills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{localizedSkills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {certificate.score && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Score:</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {certificate.score}
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        {certificate.verify_url && (
          <Link href={certificate.verify_url} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              Verify
            </Button>
          </Link>
        )}
        {certificate.certificate_file && (
          <a 
          href={certificate.certificate_file}
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1"
          download
          >
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
