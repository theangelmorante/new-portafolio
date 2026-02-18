import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: 'cyan' | 'magenta' | 'green'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'cyan',
}) => {
  const glowStyles = {
    cyan: 'border-cyber-cyan/30 shadow-cyber-glow',
    magenta: 'border-cyber-magenta/30 shadow-cyber-glow-magenta',
    green: 'border-cyber-green/30 shadow-cyber-glow-green',
  }

  return (
    <div
      className={`
        bg-cyber-gray/50 border-2 p-6 backdrop-blur-sm
        hover:border-opacity-60 transition-all duration-300
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
