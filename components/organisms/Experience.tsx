'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { ExperienceCard } from '@/components/molecules/ExperienceCard'

export const Experience: React.FC = () => {
  const { experiences, loading } = usePortfolio()

  if (loading) {
    return (
      <Section id="experience">
        <Heading level={2} className="mb-12 text-center">
          Experiencia Profesional
        </Heading>
        <p className="text-center text-cyber-cyan/60">Cargando experiencias...</p>
      </Section>
    )
  }

  return (
    <Section id="experience">
      <Heading level={2} className="mb-12 text-center">
        Experiencia Profesional
      </Heading>
      
      {experiences.length === 0 ? (
        <p className="text-center text-cyber-cyan/60">No hay experiencias disponibles</p>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </Section>
  )
}
