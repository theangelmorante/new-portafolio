import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Experience } from '@/types'

interface ExperienceCardProps {
  experience: Experience
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <Card className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-cyan" />
      
      <div className="pl-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold text-cyber-cyan font-mono uppercase">
            {experience.position}
          </h3>
          <span className="text-cyber-cyan/60 text-sm font-mono">
            {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Presente'}
          </span>
        </div>
        
        <p className="text-cyber-magenta text-lg font-mono mb-3">
          {experience.company}
        </p>
        
        <p className="text-cyber-cyan/80 mb-4 text-sm leading-relaxed">
          {experience.description}
        </p>
        
        {experience.achievements && experience.achievements.length > 0 && (
          <ul className="list-none space-y-2">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="text-cyber-cyan/70 text-sm flex items-start">
                <span className="text-cyber-green mr-2">▸</span>
                {achievement}
              </li>
            ))}
          </ul>
        )}
        
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-cyber-dark border border-cyber-green/30 text-cyber-green font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
