'use client'

import { useState } from 'react'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { addEducation } from '@/lib/firestore'
import { usePortfolio } from '@/context/PortfolioContext'

export const EducationForm: React.FC = () => {
  const { refreshData } = usePortfolio()
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
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
      const educationData = {
        institution: formData.institution,
        degree: formData.degree,
        field: formData.field,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        description: formData.description || undefined,
      }

      await addEducation(educationData)
      await refreshData()

      setSuccess('Educación agregada exitosamente')
      setFormData({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      })
    } catch (err: any) {
      setError(err.message || 'Error al agregar la educación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono uppercase">
        Agregar Educación
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Institución"
          value={formData.institution}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
          required
          disabled={loading}
        />

        <Input
          label="Título/Grado"
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          required
          disabled={loading}
        />

        <Input
          label="Campo de Estudio"
          value={formData.field}
          onChange={(e) => setFormData({ ...formData, field: e.target.value })}
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
          label="Descripción (opcional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          disabled={loading}
        />

        {error && (
          <p className="text-red-500 text-sm font-mono">{error}</p>
        )}

        {success && (
          <p className="text-cyber-green text-sm font-mono">{success}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Agregando...' : 'Agregar Educación'}
        </Button>
      </form>
    </Card>
  )
}
