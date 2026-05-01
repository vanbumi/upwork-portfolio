'use client'

import { useEffect, useState } from 'react'
import { Section } from '../ui/Section'
import Image from 'next/image'

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string | null
}

type TestimonialsProps = {
  title: string
  subtitle?: string
}

const Testimonials = ({ title, subtitle }: TestimonialsProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/testimonials')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil data testimonial')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, []) // Empty array = hanya dijalankan sekali saat komponen pertama kali dimuat

  if (loading) {
    return (
      <Section background="gray">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 mb-8">{subtitle}</p>}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="mt-4 text-gray-500">Loading testimonials...</p>
        </div>
      </Section>
    )
  }

  if (error) {
    return (
      <Section background="gray">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 mb-8">{subtitle}</p>}
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            Error loading testimonials: {error}
          </div>
        </div>
      </Section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <Section background="gray">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 mb-8">{subtitle}</p>}
          <p className="text-gray-500">No testimonials yet.</p>
        </div>
      </Section>
    )
  }

  return (
    <Section background="gray">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-600 mb-6 italic">
              "{testimonial.content}"
            </p>

            <div className="flex items-center gap-3">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Testimonials