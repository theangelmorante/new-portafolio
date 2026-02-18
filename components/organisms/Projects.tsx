'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { ProjectCard } from '@/components/molecules/ProjectCard'

export const Projects: React.FC = () => {
  const { projects, loading } = usePortfolio()

  if (loading) {
    return (
      <Section id="projects">
        <Heading level={2} className="mb-12 text-center">
          Projects
        </Heading>
        <p className="text-center text-cyber-cyan/60">Loading projects...</p>
      </Section>
    )
  }

  return (
    <Section id="projects">
      <Heading level={2} className="mb-12 text-center">
        Projects
      </Heading>
      
      {projects.length === 0 ? (
        <p className="text-center text-cyber-cyan/60">No projects available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  )
}
