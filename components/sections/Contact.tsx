'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import { Section } from '../ui/Section'
import { Button } from '../ui/Button'

// 👉 Schema validasi dengan Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactSchema>

type ContactProps = {
  title: string
  subtitle?: string
  id?: string
}

const Contact = ({ title, subtitle, id }: ContactProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  // 👇 GANTI DENGAN DATA EMAILJS ANDA
  const EMAILJS_SERVICE_ID = 'service_b4an0a6'    // Ganti dengan Service ID Anda
  const EMAILJS_TEMPLATE_ID = 'template_32p6sp9'  // Ganti dengan Template ID Anda
  const EMAILJS_PUBLIC_KEY = 'J7h3ENEWcHViRiaMj'        // Ganti dengan Public Key Anda

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setIsError(false)

    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setIsSuccess(true)
      reset()
      
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Email sending failed:', error)
      setIsError(true)
      setTimeout(() => setIsError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section background="white" id={id}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Tell me about your project..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-700">✅ Thank you! I'll get back to you within 24 hours.</p>
            </div>
          )}

          {/* Error Message */}
          {isError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-700">❌ Failed to send message. Please email me directly at hello@yourbrand.com</p>
            </div>
          )}
        </form>
      </div>
    </Section>
  )
}

export default Contact