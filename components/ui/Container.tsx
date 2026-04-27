import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer'
}

export const Container = ({ 
  children, 
  className = '', 
  as: Component = 'div' 
}: ContainerProps) => {
  return (
    <Component className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl ${className}`}>
      {children}
    </Component>
  )
}