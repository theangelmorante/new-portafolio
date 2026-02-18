'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { updatePersonalInfo, getPersonalInfo } from '@/lib/firestore'
import { uploadImage } from '@/lib/storage'
import { usePortfolio } from '@/context/PortfolioContext'

export const PersonalInfoForm: React.FC = () => {
  const { refreshData, personalInfo } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    website: '',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (personalInfo) {
      setFormData({
        name: personalInfo.name || '',
        title: personalInfo.title || '',
        bio: personalInfo.bio || '',
        email: personalInfo.email || '',
        location: personalInfo.location || '',
        github: personalInfo.socialLinks?.github || '',
        linkedin: personalInfo.socialLinks?.linkedin || '',
        twitter: personalInfo.socialLinks?.twitter || '',
        instagram: personalInfo.socialLinks?.instagram || '',
        website: personalInfo.socialLinks?.website || '',
      })
      if (personalInfo.avatarUrl) {
        setAvatarPreview(personalInfo.avatarUrl)
      }
    }
  }, [personalInfo])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
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
      let avatarUrl = personalInfo?.avatarUrl

      if (avatarFile) {
        const imagePath = `avatars/${Date.now()}_${avatarFile.name}`
        avatarUrl = await uploadImage(avatarFile, imagePath)
      }

      // Construir socialLinks solo con campos que tienen valores
      const socialLinks: Record<string, string> = {}
      if (formData.github.trim()) socialLinks.github = formData.github.trim()
      if (formData.linkedin.trim()) socialLinks.linkedin = formData.linkedin.trim()
      if (formData.twitter.trim()) socialLinks.twitter = formData.twitter.trim()
      if (formData.instagram.trim()) socialLinks.instagram = formData.instagram.trim()
      if (formData.website.trim()) socialLinks.website = formData.website.trim()

      const personalInfoData = {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        email: formData.email,
        location: formData.location,
        avatarUrl,
        socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : {},
      }

      await updatePersonalInfo(personalInfoData)
      await refreshData()

      setSuccess('Información personal actualizada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la información personal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono uppercase">
        Editar Información Personal
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-cyber-cyan text-sm font-mono mb-2 uppercase tracking-wider">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={loading}
            className="w-full px-4 py-3 bg-cyber-gray border border-cyber-cyan/30 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-glow transition-all duration-300"
          />
          {avatarPreview && (
            <div className="mt-4 relative w-32 h-32">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-full h-full object-cover cyber-border rounded-full"
              />
            </div>
          )}
        </div>

        <Input
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />

        <Input
          label="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
        />

        <Textarea
          label="Biografía"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          required
          disabled={loading}
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
        />

        <Input
          label="Ubicación"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          disabled={loading}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="GitHub (opcional)"
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            disabled={loading}
          />

          <Input
            label="LinkedIn (opcional)"
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Twitter (opcional)"
            type="url"
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            disabled={loading}
          />

          <Input
            label="Instagram (opcional)"
            type="url"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            placeholder="https://instagram.com/yourusername"
            disabled={loading}
          />
        </div>

        <Input
          label="Website (opcional)"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          disabled={loading}
        />

        {error && (
          <p className="text-red-500 text-sm font-mono">{error}</p>
        )}

        {success && (
          <p className="text-cyber-green text-sm font-mono">{success}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Actualizando...' : 'Actualizar Información'}
        </Button>
      </form>
    </Card>
  )
}
