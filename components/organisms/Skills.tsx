'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { Card } from '@/components/atoms/Card'

export const Skills: React.FC = () => {
  const { skills } = usePortfolio()

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    tools: 'Tools',
    other: 'Other',
  }

  const levelColors: Record<string, string> = {
    beginner: 'bg-cyber-gray border-cyber-cyan/30',
    intermediate: 'bg-cyber-gray border-cyber-green/50',
    advanced: 'bg-cyber-gray border-cyber-green',
    expert: 'bg-cyber-green/20 border-cyber-green cyber-text-glow-green',
  }

  return (
    <Section id="skills">
      <Heading level={2} className="mb-12 text-center">
        Skills
      </Heading>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <Card key={category} glow="green">
            <h3 className="text-xl font-bold text-cyber-green mb-4 font-mono uppercase">
              {categoryLabels[category] || category}
            </h3>
            
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-cyber-cyan font-mono text-sm">
                      {skill.name}
                    </span>
                    <span className="text-cyber-green/70 text-xs font-mono uppercase">
                      {skill.level}
                    </span>
                  </div>
                  <div className={`h-2 border ${levelColors[skill.level]}`} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
