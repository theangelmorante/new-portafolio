/**
 * Servicio de almacenamiento de imágenes usando Cloudinary.
 * Las subidas se realizan a través de la API /api/upload para mantener
 * las credenciales seguras en el servidor.
 */

export async function uploadImage(file: File, path: string): Promise<string> {
  const folder = path.includes('/') ? path.split('/')[0] : 'portfolio'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || `Error al subir la imagen (${response.status})`)
  }

  const data = await response.json()
  if (!data.url) {
    throw new Error('No se recibió la URL de la imagen')
  }

  return data.url
}

/**
 * Cloudinary no requiere eliminación desde el cliente para este flujo.
 * Si en el futuro quieres eliminar imágenes, puedes crear una API route
 * que use la API de eliminación de Cloudinary.
 */
export async function deleteImage(_path: string): Promise<void> {
  // Opcional: implementar eliminación vía API si lo necesitas
  console.warn('deleteImage: no implementado para Cloudinary')
}
