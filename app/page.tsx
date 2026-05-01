'use client'

import { useState } from 'react'
import { Header } from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'  // ← tanpa kurung kurawal
import { 
  HeroCenter, 
  HeroLeft, 
  HeroWithImage, 
  FeaturesGrid, 
  PricingSimple,
  Testimonials,
  Contact,
  SocialAuto      // 👈 TAMBAHKAN
} from '@/components/sections'
import { HeroSwitcher } from '@/components/ui/HeroSwitcher'

export default function Home() {
  const [activeHero, setActiveHero] = useState<'center' | 'left' | 'image'>('center')

  // Data Features
  const sampleFeatures = [
    { title: "Fast Performance", description: "Lightning fast load times with Next.js 15 and automatic optimization", icon: "⚡" },
    { title: "SEO Optimized", description: "Built with best practices for maximum search engine visibility", icon: "📈" },
    { title: "Mobile First", description: "Fully responsive design that looks great on any device", icon: "📱" },
    { title: "TypeScript Ready", description: "Type-safe code for better developer experience", icon: "🔷" },
    { title: "Easy Customization", description: "Modular components that are easy to modify and extend", icon: "🎨" },
    { title: "Analytics Ready", description: "Ready to integrate with Google Analytics, Mixpanel, etc", icon: "📊" }
  ]

  // Data Pricing
  const pricingTiers = [
    {
      name: "Starter",
      price: "$397",
      description: "One-time payment. Perfect for startups.",
      features: [
        "1 Landing Page", 
        "Mobile Responsive", 
        "SEO Optimized", 
        "Contact Form", 
        "3 Days Delivery"
      ],
      buttonText: "Start Project",
    },
    {
      name: "Professional", 
      price: "$797",
      description: "One-time payment. Best for growing companies.",
      features: [
        "Up to 3 Pages",
        "Advanced SEO", 
        "Analytics Setup", 
        "5 Days Support",
        "7 Days Delivery",
        "Content Upload"
      ],
      buttonText: "Choose Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$1,497",
      description: "One-time payment. For large organizations.",
      features: [
        "Unlimited Pages",
        "Custom Design", 
        "Priority Support", 
        "CMS Integration",
        "14 Days Delivery",
        "1 Year Hosting"
      ],
      buttonText: "Contact Us",
    },
  ]

  // Data Testimonials
  // const testimonialsData = [
  //   {
  //     name: "Sarah Johnson",
  //     role: "Founder",
  //     company: "TechStart",
  //     content: "The landing page converted 40% better than our old one. Amazing work!",
  //     rating: 5
  //   },
  //   {
  //     name: "Michael Chen",
  //     role: "Marketing Director",
  //     company: "GrowthLabs",
  //     content: "Professional, fast, and SEO optimized. Our organic traffic doubled.",
  //     rating: 5
  //   },
  //   {
  //     name: "Emma Williams",
  //     role: "CEO",
  //     company: "CreativeStudio",
  //     content: "Best investment for our brand. The team understood exactly what we needed.",
  //     rating: 5
  //   }
  // ]

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      {activeHero === 'center' && (
        <HeroCenter 
          title="Build Fast. Convert Better."
          subtitle="Professional landing pages built with Next.js 15 and Tailwind CSS. Blazing fast and SEO optimized."
          ctaText="Start Building"
          secondaryCtaText="View Pricing"
        />
      )}
      
      {activeHero === 'left' && (
        <HeroLeft 
          title="Landing Pages That Actually Convert"
          subtitle="Stop wasting time on complex setups. Get a beautiful, high-converting landing page in days, not weeks."
          ctaText="Get Started Now"
          badge="🔥 Limited Offer"
        />
      )}
      
      {activeHero === 'image' && (
        <HeroWithImage 
          title="Beautiful Landing Pages Made Simple"
          subtitle="Launch your product faster with our professional templates. Used by 1000+ businesses worldwide."
          ctaText="View Templates"
        />
      )}
      
      {/* Features Section */}
      <FeaturesGrid 
        id="features"
        title="Powerful Features"
        subtitle="Everything you need to create high-converting landing pages"
        features={sampleFeatures}
      />
      
      {/* Pricing Section */}
      <PricingSimple 
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your business"
        tiers={pricingTiers}
        id="pricing"
      />

      {/* Testimonials Section */}
      <Testimonials 
        title="What Our Clients Say"
        subtitle="Trusted by businesses worldwide"
      />

      {/* 👈 TAMBAHKAN INI */}
      <SocialAuto />

      {/* Contact Section */}
      <Contact 
        id="contact"
        title="Let's Work Together"
        subtitle="Have a project in mind? Let's discuss how I can help you."
      />
      
      {/* Hero Switcher */}
      <HeroSwitcher activeHero={activeHero} onSwitch={setActiveHero} />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}