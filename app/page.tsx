import { Header } from '@/components/layouts/Header'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function Home() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <Section background="gradient" className="pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Beautiful Landing Pages
            <span className="text-blue-600"> Fast.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Component library siap pakai untuk landing page profesional. 
            Hemat waktu, fokus ke value bisnis klien Anda.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </Section>
      
      {/* Test Section */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Semua Komponen Berfungsi ✅
            </h2>
            <p className="text-xl text-gray-600">
              Button, Container, Section, dan Header sudah siap pakai
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}