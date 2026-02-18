'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { EducationCard } from '@/components/molecules/EducationCard'

export const Education: React.FC = () => {
  const { education, loading } = usePortfolio()

  if (loading) {
    return (
      <Section id="education">
        <Heading level={2} className="mb-12 text-center">
          Educación
        </Heading>
        <p className="text-center text-cyber-cyan/60">Cargando educación...</p>
      </Section>
    )
  }

  return (
    <Section id="education">
      <Heading level={2} className="mb-12 text-center">
        Educación
      </Heading>
      
      {education.length === 0 ? (
        <p className="text-center text-cyber-cyan/60">No hay información educativa disponible</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </div>
      )}
    </Section>
  )
}
