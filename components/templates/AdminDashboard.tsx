'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { ProjectForm } from '@/components/organisms/admin/ProjectForm'
import { ExperienceForm } from '@/components/organisms/admin/ExperienceForm'
import { CertificationForm } from '@/components/organisms/admin/CertificationForm'
import { EducationForm } from '@/components/organisms/admin/EducationForm'
import { SkillForm } from '@/components/organisms/admin/SkillForm'
import { PersonalInfoForm } from '@/components/organisms/admin/PersonalInfoForm'

type FormType = 'project' | 'experience' | 'certification' | 'education' | 'skill' | 'personal'

export const AdminDashboard: React.FC = () => {
  const { signOut } = useAuth()
  const router = useRouter()
  const [activeForm, setActiveForm] = useState<FormType | null>(null)

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cyber-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Heading level={2}>Panel de Administración</Heading>
          <Button variant="outline" glow="magenta" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Button
            variant={activeForm === 'project' ? 'primary' : 'outline'}
            onClick={() => setActiveForm(activeForm === 'project' ? null : 'project')}
            className="w-full"
          >
            {activeForm === 'project' ? 'Ocultar' : 'Agregar'} Proyecto
          </Button>
          <Button
            variant={activeForm === 'experience' ? 'primary' : 'outline'}
            onClick={() => setActiveForm(activeForm === 'experience' ? null : 'experience')}
            className="w-full"
          >
            {activeForm === 'experience' ? 'Ocultar' : 'Agregar'} Experiencia
          </Button>
          <Button
            variant={activeForm === 'certification' ? 'primary' : 'outline'}
            onClick={() => setActiveForm(activeForm === 'certification' ? null : 'certification')}
            className="w-full"
          >
            {activeForm === 'certification' ? 'Ocultar' : 'Agregar'} Certificación
          </Button>
          <Button
            variant={activeForm === 'education' ? 'primary' : 'outline'}
            onClick={() => setActiveForm(activeForm === 'education' ? null : 'education')}
            className="w-full"
          >
            {activeForm === 'education' ? 'Ocultar' : 'Agregar'} Educación
          </Button>
          <Button
            variant={activeForm === 'skill' ? 'primary' : 'outline'}
            onClick={() => setActiveForm(activeForm === 'skill' ? null : 'skill')}
            className="w-full"
          >
            {activeForm === 'skill' ? 'Ocultar' : 'Agregar'} Habilidad
          </Button>
          <Button
            variant={activeForm === 'personal' ? 'primary' : 'outline'}
            onClick={() => setActiveForm(activeForm === 'personal' ? null : 'personal')}
            className="w-full"
          >
            {activeForm === 'personal' ? 'Ocultar' : 'Editar'} Info Personal
          </Button>
        </div>

        <div className="space-y-8">
          {activeForm === 'project' && <ProjectForm />}
          {activeForm === 'experience' && <ExperienceForm />}
          {activeForm === 'certification' && <CertificationForm />}
          {activeForm === 'education' && <EducationForm />}
          {activeForm === 'skill' && <SkillForm />}
          {activeForm === 'personal' && <PersonalInfoForm />}
        </div>
      </div>
    </div>
  )
}
