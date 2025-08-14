"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sendContactMessage } from "@/lib/api"
import type { ContactMessageCreate } from "@/lib/types"
import type { Locale } from "../../i18n-config"
import { SendIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"

interface ContactFormProps {
  locale: Locale
  dict: any
}

export default function ContactForm({ locale, dict }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactMessageCreate>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await sendContactMessage(formData)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: dict.contact.form.error_message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClassName =
    "flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
  const textareaClassName =
    "flex min-h-[120px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
  const labelClassName = "text-sm font-semibold text-gray-700 mb-2 block"

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          {dict.contact.form.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClassName}>
                {dict.contact.form.name} *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={dict.contact.form.name_placeholder}
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClassName}>
                {dict.contact.form.email} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={dict.contact.form.email_placeholder}
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className={labelClassName}>
                {dict.contact.form.phone}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={dict.contact.form.phone_placeholder}
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="company" className={labelClassName}>
                {dict.contact.form.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                placeholder={dict.contact.form.company_placeholder}
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={labelClassName}>
              {dict.contact.form.subject} *
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder={dict.contact.form.subject_placeholder}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClassName}>
              {dict.contact.form.message} *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder={dict.contact.form.message_placeholder}
              className={textareaClassName}
            />
          </div>

          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircleIcon className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">{submitStatus.message}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {dict.contact.form.sending}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SendIcon className="w-4 h-4" />
                {dict.contact.form.send}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}