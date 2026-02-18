'use client'

import { useState } from 'react'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { addProject } from '@/lib/firestore'
import { uploadImage } from '@/lib/storage'
import { usePortfolio } from '@/context/PortfolioContext'

export const ProjectForm: React.FC = () => {
  const { refreshData } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    githubUrl: '',
    technologies: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!imageFile) {
        throw new Error('Debes seleccionar una imagen')
      }

      // Upload image
      const imagePath = `projects/${Date.now()}_${imageFile.name}`
      const imageUrl = await uploadImage(imageFile, imagePath)

      // Prepare project data
      const projectData = {
        name: formData.name,
        description: formData.description,
        imageUrl,
        url: formData.url || undefined,
        githubUrl: formData.githubUrl || undefined,
        technologies: formData.technologies
          .split(',')
          .map(tech => tech.trim())
          .filter(tech => tech.length > 0),
      }

      await addProject(projectData)
      await refreshData()

      setSuccess('Proyecto agregado exitosamente')
      setFormData({
        name: '',
        description: '',
        url: '',
        githubUrl: '',
        technologies: '',
      })
      setImageFile(null)
      setImagePreview('')
    } catch (err: any) {
      setError(err.message || 'Error al agregar el proyecto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono uppercase">
        Agregar Proyecto
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre del Proyecto"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />

        <Textarea
          label="Descripción"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
          disabled={loading}
        />

        <Input
          label="URL del Proyecto (opcional)"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          disabled={loading}
        />

        <Input
          label="URL de GitHub (opcional)"
          type="url"
          value={formData.githubUrl}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          disabled={loading}
        />

        <Input
          label="Tecnologías (separadas por comas)"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          placeholder="React, Next.js, TypeScript"
          required
          disabled={loading}
        />

        <div>
          <label className="block text-cyber-cyan text-sm font-mono mb-2 uppercase tracking-wider">
            Imagen del Proyecto
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-cyber-gray border border-cyber-cyan/30 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-glow transition-all duration-300"
          />
          {imagePreview && (
            <div className="mt-4 relative w-full h-48">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover cyber-border"
              />
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm font-mono">{error}</p>
        )}

        {success && (
          <p className="text-cyber-green text-sm font-mono">{success}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Agregando...' : 'Agregar Proyecto'}
        </Button>
      </form>
    </Card>
  )
}
