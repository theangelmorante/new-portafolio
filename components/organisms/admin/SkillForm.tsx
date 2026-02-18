'use client'

import { useState } from 'react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { addSkill } from '@/lib/firestore'
import { usePortfolio } from '@/context/PortfolioContext'

export const SkillForm: React.FC = () => {
  const { refreshData } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other',
    level: 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    icon: '',
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
      const skillData = {
        name: formData.name,
        category: formData.category,
        level: formData.level,
        icon: formData.icon || undefined,
      }

      await addSkill(skillData)
      await refreshData()

      setSuccess('Habilidad agregada exitosamente')
      setFormData({
        name: '',
        category: 'frontend',
        level: 'intermediate',
        icon: '',
      })
    } catch (err: any) {
      setError(err.message || 'Error al agregar la habilidad')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono uppercase">
        Agregar Habilidad
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre de la Habilidad"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />

        <div>
          <label className="block text-cyber-cyan text-sm font-mono mb-2 uppercase tracking-wider">
            Categoría
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            disabled={loading}
            className="w-full px-4 py-3 bg-cyber-gray border border-cyber-cyan/30 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-glow transition-all duration-300"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Base de Datos</option>
            <option value="devops">DevOps</option>
            <option value="tools">Herramientas</option>
            <option value="other">Otros</option>
          </select>
        </div>

        <div>
          <label className="block text-cyber-cyan text-sm font-mono mb-2 uppercase tracking-wider">
            Nivel
          </label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
            disabled={loading}
            className="w-full px-4 py-3 bg-cyber-gray border border-cyber-cyan/30 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-glow transition-all duration-300"
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
            <option value="expert">Experto</option>
          </select>
        </div>

        <Input
          label="Icono (opcional)"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="URL o código del icono"
          disabled={loading}
        />

        {error && (
          <p className="text-red-500 text-sm font-mono">{error}</p>
        )}

        {success && (
          <p className="text-cyber-green text-sm font-mono">{success}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Agregando...' : 'Agregar Habilidad'}
        </Button>
      </form>
    </Card>
  )
}
