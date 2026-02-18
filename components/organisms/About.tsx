'use client'

import React from 'react'
import Image from 'next/image'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { Card } from '@/components/atoms/Card'

export const About: React.FC = () => {
  const { personalInfo } = usePortfolio()

  return (
    <Section id="about">
      <Heading level={2} className="mb-12 text-center">
        Sobre Mí
      </Heading>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {personalInfo?.avatarUrl && (
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              fill
              className="object-cover cyber-border rounded"
            />
          </div>
        )}
        
        <Card>
          <p className="text-cyber-cyan/90 mb-6 leading-relaxed">
            {personalInfo?.bio || 'Información personal no disponible'}
          </p>
          
          <div className="space-y-4">
            {personalInfo?.email && (
              <div>
                <span className="text-cyber-green font-mono text-sm uppercase">Email:</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="ml-2 text-cyber-cyan hover:text-cyber-green transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            )}
            
            {personalInfo?.location && (
              <div>
                <span className="text-cyber-green font-mono text-sm uppercase">Ubicación:</span>
                <span className="ml-2 text-cyber-cyan">{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.socialLinks && (
              <div className="flex gap-4 mt-6">
                {personalInfo.socialLinks.github && (
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-cyan hover:text-cyber-green transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {personalInfo.socialLinks.linkedin && (
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-cyan hover:text-cyber-green transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {personalInfo.socialLinks.twitter && (
                  <a
                    href={personalInfo.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-cyan hover:text-cyber-green transition-colors"
                  >
                    Twitter
                  </a>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Section>
  )
}
