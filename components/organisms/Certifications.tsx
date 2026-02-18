'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { CertificationCard } from '@/components/molecules/CertificationCard'

export const Certifications: React.FC = () => {
  const { certifications, loading } = usePortfolio()

  if (loading) {
    return (
      <Section id="certifications">
        <Heading level={2} className="mb-12 text-center">
          Certifications
        </Heading>
        <p className="text-center text-cyber-cyan/60">Loading certifications...</p>
      </Section>
    )
  }

  return (
    <Section id="certifications">
      <Heading level={2} className="mb-12 text-center">
        Certifications
      </Heading>
      
      {certifications.length === 0 ? (
        <p className="text-center text-cyber-cyan/60">No certifications available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      )}
    </Section>
  )
}
