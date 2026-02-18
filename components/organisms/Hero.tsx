'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'

export const Hero: React.FC = () => {
  const { personalInfo } = usePortfolio()

  return (
    <Section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-cyber-green font-mono text-sm uppercase tracking-wider">
            {'>'} Bienvenido
          </span>
        </div>
        
        <Heading level={1} className="mb-4">
          {personalInfo?.name || 'Tu Nombre'}
        </Heading>
        
        <p className="text-2xl md:text-3xl text-cyber-cyan/80 font-mono mb-8 cyber-text-glow">
          {personalInfo?.title || 'Desarrollador Full Stack'}
        </p>
        
        <p className="text-lg text-cyber-cyan/60 max-w-2xl mx-auto mb-8 leading-relaxed">
          {personalInfo?.bio || 'Desarrollador apasionado por crear soluciones innovadoras...'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Ver Proyectos
          </Button>
          <Button
            variant="outline"
            glow="magenta"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Sobre Mí
          </Button>
        </div>
      </div>
    </Section>
  )
}
