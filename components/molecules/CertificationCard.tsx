import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/atoms/Card'
import { Certification } from '@/types'

interface CertificationCardProps {
  certification: Certification
}

export const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <Card glow="green" className="text-center">
      {certification.imageUrl && (
        <div className="relative w-full h-32 mb-4">
          <Image
            src={certification.imageUrl}
            alt={certification.name}
            fill
            className="object-contain"
          />
        </div>
      )}
      
      <h3 className="text-lg font-bold text-cyber-green mb-2 font-mono uppercase">
        {certification.name}
      </h3>
      
      <p className="text-cyber-cyan/80 mb-2 text-sm font-mono">
        {certification.issuer}
      </p>
      
      <p className="text-cyber-green/70 text-xs font-mono mb-4">
        Emitido: {formatDate(certification.issueDate)}
        {certification.expiryDate && ` • Expira: ${formatDate(certification.expiryDate)}`}
      </p>
      
      {certification.credentialUrl && (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-green hover:text-cyber-cyan text-xs font-mono underline transition-colors"
        >
          Ver Credencial
        </a>
      )}
    </Card>
  )
}
