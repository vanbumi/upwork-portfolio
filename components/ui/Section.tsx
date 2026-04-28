import { ReactNode } from 'react'
import { Container } from './Container'

type SectionProps = {
  children: ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient'
  id?: string
}

export const Section = ({ 
  children, 
  className = '', 
  background = 'white',
  id 
}: SectionProps) => {
  
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50'
  }
  
  return (
    <section id={id} className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  )
}