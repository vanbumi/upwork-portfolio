'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() // Untuk tahu halaman mana yang aktif
  
  // Definisikan menu dengan link yang benar
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Social Auto', href: '/#social-auto' },  // 👈 TAMBAHKAN
    { name: 'Blog', href: '/blog' },
  ]
  
  // Cek apakah link aktif (untuk styling)
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/' // Untuk anchor link di homepage
    return pathname === href
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo - Link ke Home */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Refactor Digitalism
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href) 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="primary" href="/#contact">Contact</Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`py-2 transition-colors ${
                    isActive(item.href) 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="primary" href="/#contact" className="text-center">
                Contact
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}