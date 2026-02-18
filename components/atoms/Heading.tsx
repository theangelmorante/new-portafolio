import React from 'react'

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  glow?: 'cyan' | 'magenta' | 'green'
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  className = '',
  glow = 'cyan',
}) => {
  const sizes = {
    1: 'text-5xl md:text-6xl lg:text-7xl',
    2: 'text-4xl md:text-5xl lg:text-6xl',
    3: 'text-3xl md:text-4xl',
    4: 'text-2xl md:text-3xl',
    5: 'text-xl md:text-2xl',
    6: 'text-lg md:text-xl',
  }

  const glowStyles = {
    cyan: 'cyber-text-glow',
    magenta: 'cyber-text-glow-magenta',
    green: 'cyber-text-glow-green',
  }

  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements

  return (
    <Tag
      className={`
        font-mono font-bold uppercase tracking-wider
        ${sizes[level]}
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </Tag>
  )
}
