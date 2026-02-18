import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Education } from '@/types'

interface EducationCardProps {
  education: Education
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <Card glow="magenta">
      <h3 className="text-xl font-bold text-cyber-magenta mb-2 font-mono uppercase">
        {education.degree}
      </h3>
      
      <p className="text-cyber-cyan text-lg font-mono mb-2">
        {education.field}
      </p>
      
      <p className="text-cyber-cyan/80 mb-3 text-sm font-mono">
        {education.institution}
      </p>
      
      <p className="text-cyber-magenta/70 text-xs font-mono mb-3">
        {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : 'Present'}
      </p>
      
      {education.description && (
        <p className="text-cyber-cyan/70 text-sm leading-relaxed">
          {education.description}
        </p>
      )}
    </Card>
  )
}
