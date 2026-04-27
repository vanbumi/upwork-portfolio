import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  href?: string
  className?: string
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  href,
  className = '' 
}: ButtonProps) => {
  
  const baseStyles = "inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 cursor-pointer text-center"
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  }
  
  const styles = `${baseStyles} ${variants[variant]} ${className}`
  
  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    )
  }
  
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  )
}