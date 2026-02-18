'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  Project, 
  Experience, 
  Certification, 
  Education, 
  Skill, 
  PersonalInfo 
} from '@/types'
import { 
  getProjects, 
  getExperiences, 
  getCertifications, 
  getEducation, 
  getSkills,
  getPersonalInfo 
} from '@/lib/firestore'

interface PortfolioContextType {
  projects: Project[]
  experiences: Experience[]
  certifications: Certification[]
  education: Education[]
  skills: Skill[]
  personalInfo: PersonalInfo | null
  loading: boolean
  refreshData: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshData = async () => {
    try {
      setLoading(true)
      const [projectsData, experiencesData, certificationsData, educationData, skillsData, personalInfoData] = 
        await Promise.all([
          getProjects(),
          getExperiences(),
          getCertifications(),
          getEducation(),
          getSkills(),
          getPersonalInfo()
        ])
      
      setProjects(projectsData)
      setExperiences(experiencesData)
      setCertifications(certificationsData)
      setEducation(educationData)
      setSkills(skillsData)
      setPersonalInfo(personalInfoData)
    } catch (error) {
      console.error('Error loading portfolio data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        experiences,
        certifications,
        education,
        skills,
        personalInfo,
        loading,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
