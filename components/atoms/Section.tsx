import React from 'react'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`
        relative py-20 px-4 md:px-8 lg:px-16
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}
