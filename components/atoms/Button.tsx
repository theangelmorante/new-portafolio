import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  glow?: 'cyan' | 'magenta' | 'green'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  glow = 'cyan',
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 font-mono text-sm font-semibold transition-all duration-300 uppercase tracking-wider'
  
  const variantStyles = {
    primary: 'bg-cyber-cyan text-cyber-dark hover:bg-cyber-green',
    secondary: 'bg-cyber-magenta text-white hover:bg-cyber-purple',
    outline: 'border-2 border-cyber-cyan text-cyber-cyan bg-transparent hover:bg-cyber-cyan hover:text-cyber-dark',
  }
  
  const glowStyles = {
    cyan: 'shadow-cyber-glow hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]',
    magenta: 'shadow-cyber-glow-magenta hover:shadow-[0_0_30px_rgba(255,0,255,0.8)]',
    green: 'shadow-cyber-glow-green hover:shadow-[0_0_30px_rgba(0,255,65,0.8)]',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
