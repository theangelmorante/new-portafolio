'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { AdminDashboard } from '@/components/templates/AdminDashboard'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
        <p className="text-cyber-cyan font-mono">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <AdminDashboard />
}
