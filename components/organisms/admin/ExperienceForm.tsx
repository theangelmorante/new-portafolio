'use client'

import { useState } from 'react'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { addExperience } from '@/lib/firestore'
import { usePortfolio } from '@/context/PortfolioContext'

export const ExperienceForm: React.FC = () => {
  const { refreshData } = usePortfolio()
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: '',
    technologies: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const experienceData = {
        company: formData.company,
        position: formData.position,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        description: formData.description,
        achievements: formData.achievements
          .split('\n')
          .map(ach => ach.trim())
          .filter(ach => ach.length > 0),
        technologies: formData.technologies
          .split(',')
          .map(tech => tech.trim())
          .filter(tech => tech.length > 0),
      }

      await addExperience(experienceData)
      await refreshData()

      setSuccess('Experiencia agregada exitosamente')
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: '',
        technologies: '',
      })
    } catch (err: any) {
      setError(err.message || 'Error al agregar la experiencia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono uppercase">
        Agregar Experiencia Profesional
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Empresa"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
          disabled={loading}
        />

        <Input
          label="Puesto"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
          disabled={loading}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Fecha de Inicio"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
            disabled={loading}
          />

          <Input
            label="Fecha de Fin (opcional)"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            disabled={loading}
          />
        </div>

        <Textarea
          label="Descripción"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
          disabled={loading}
        />

        <Textarea
          label="Logros (uno por línea)"
          value={formData.achievements}
          onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
          rows={4}
          placeholder="Logro 1&#10;Logro 2&#10;Logro 3"
          disabled={loading}
        />

        <Input
          label="Tecnologías (separadas por comas)"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          placeholder="React, Node.js, PostgreSQL"
          disabled={loading}
        />

        {error && (
          <p className="text-red-500 text-sm font-mono">{error}</p>
        )}

        {success && (
          <p className="text-cyber-green text-sm font-mono">{success}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Agregando...' : 'Agregar Experiencia'}
        </Button>
      </form>
    </Card>
  )
}
