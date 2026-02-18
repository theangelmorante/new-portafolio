'use client'

import React from 'react'
import { usePortfolio } from '@/context/PortfolioContext'

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolio()

  return (
    <footer className="border-t border-cyber-cyan/30 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-cyber-cyan/60 font-mono text-sm mb-4">
          © {new Date().getFullYear()} {personalInfo?.name || 'Portfolio'}. All rights reserved.
        </p>
        
        {personalInfo?.socialLinks && (
          <div className="flex justify-center gap-4">
            {personalInfo.socialLinks.github && (
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                GitHub
              </a>
            )}
            {personalInfo.socialLinks.linkedin && (
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.socialLinks.twitter && (
              <a
                href={personalInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                Twitter
              </a>
            )}
            {personalInfo.socialLinks.instagram && (
              <a
                href={personalInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
