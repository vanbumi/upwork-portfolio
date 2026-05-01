import { NextResponse } from 'next/server'

// Data testimonial (sementara hardcode, nanti bisa dari database)
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder",
    company: "TechStart",
    content: "The landing page converted 40% better than our old one. Amazing work!",
    rating: 5,
    avatar: null
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthLabs",
    content: "Professional, fast, and SEO optimized. Our organic traffic doubled.",
    rating: 5,
    avatar: null
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "CEO",
    company: "CreativeStudio",
    content: "Best investment for our brand. The team understood exactly what we needed.",
    rating: 5,
    avatar: null
  }
]

export async function GET() {
  // Return data sebagai JSON response
  return NextResponse.json(testimonials)
}