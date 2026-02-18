import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

function getSignature(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort()
  const paramsString = sortedKeys.map(key => `${key}=${params[key]}`).join('&')
  return crypto.createHash('sha1').update(paramsString + API_SECRET).digest('hex')
}

export async function POST(request: NextRequest) {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json(
      { error: 'Cloudinary no está configurado. Revisa las variables de entorno.' },
      { status: 500 }
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'portfolio'

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No se envió ningún archivo' },
        { status: 400 }
      )
    }

    const timestamp = Math.round(Date.now() / 1000).toString()
    const params: Record<string, string> = {
      folder,
      timestamp,
    }

    const signature = getSignature(params)

    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', file)
    cloudinaryFormData.append('api_key', API_KEY)
    cloudinaryFormData.append('timestamp', timestamp)
    cloudinaryFormData.append('signature', signature)
    cloudinaryFormData.append('folder', folder)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Cloudinary error:', errorData)
      return NextResponse.json(
        { error: errorData.error?.message || 'Error al subir la imagen a Cloudinary' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ url: data.secure_url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al subir la imagen' },
      { status: 500 }
    )
  }
}
