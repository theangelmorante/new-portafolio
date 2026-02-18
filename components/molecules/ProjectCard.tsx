import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="h-full flex flex-col group">
      <div className="relative w-full h-48 mb-4 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <h3 className="text-xl font-bold text-cyber-cyan mb-2 font-mono uppercase">
        {project.name}
      </h3>
      
      <p className="text-cyber-cyan/80 mb-4 flex-grow text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-cyber-dark border border-cyber-cyan/30 text-cyber-cyan font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-2">
        {project.url && (
          <Button
            variant="outline"
            onClick={() => window.open(project.url, '_blank')}
            className="flex-1"
          >
            View Project
          </Button>
        )}
        {project.githubUrl && (
          <Button
            variant="outline"
            glow="green"
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="flex-1"
          >
            GitHub
          </Button>
        )}
      </div>
    </Card>
  )
}
