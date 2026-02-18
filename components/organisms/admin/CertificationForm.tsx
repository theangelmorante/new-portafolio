'use client'

import { useState } from 'react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { addCertification } from '@/lib/firestore'
import { uploadImage } from '@/lib/storage'
import { usePortfolio } from '@/context/PortfolioContext'

export const CertificationForm: React.FC = () => {
  const { refreshData } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialUrl: '',
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
      let imageUrl: string | undefined

      if (imageFile) {
        const imagePath = `certifications/${Date.now()}_${imageFile.name}`
        imageUrl = await uploadImage(imageFile, imagePath)
      }

      const certificationData = {
        name: formData.name,
        issuer: formData.issuer,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate || undefined,
        credentialUrl: formData.credentialUrl || undefined,
        imageUrl,
      }

      await addCertification(certificationData)
      await refreshData()

      setSuccess('Certificación agregada exitosamente')
      setFormData({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialUrl: '',
      })
      setImageFile(null)
      setImagePreview('')
    } catch (err: any) {
      setError(err.message || 'Error al agregar la certificación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono uppercase">
        Agregar Certificación
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre de la Certificación"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />

        <Input
          label="Emisor"
          value={formData.issuer}
          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
          required
          disabled={loading}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Fecha de Emisión"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            required
            disabled={loading}
          />

          <Input
            label="Fecha de Expiración (opcional)"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            disabled={loading}
          />
        </div>

        <Input
          label="URL de la Credencial (opcional)"
          type="url"
          value={formData.credentialUrl}
          onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
          disabled={loading}
        />

        <div>
          <label className="block text-cyber-cyan text-sm font-mono mb-2 uppercase tracking-wider">
            Imagen de la Certificación (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="w-full px-4 py-3 bg-cyber-gray border border-cyber-cyan/30 text-cyber-cyan font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-glow transition-all duration-300"
          />
          {imagePreview && (
            <div className="mt-4 relative w-full h-48">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain cyber-border"
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
          {loading ? 'Agregando...' : 'Agregar Certificación'}
        </Button>
      </form>
    </Card>
  )
}
