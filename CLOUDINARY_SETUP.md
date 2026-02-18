# Configuración de Cloudinary

El proyecto usa **Cloudinary** para subir y servir imágenes (avatares, proyectos, certificaciones). Las credenciales se usan solo en el servidor (API route), así que no necesitas variables `NEXT_PUBLIC_*` para Cloudinary.

---

## Variables de entorno necesarias

Crea o edita `.env.local` y añade:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**En Vercel:** Settings → Environment Variables → añade las mismas tres variables.

---

## Dónde obtener las credenciales

1. **Entra en Cloudinary**  
   - [https://cloudinary.com/](https://cloudinary.com/)  
   - Inicia sesión o crea una cuenta gratuita.

2. **Abre el Dashboard**  
   - Tras iniciar sesión verás el **Dashboard**.

3. **Ve a Product Environment Credentials**  
   - Arriba a la derecha: **Settings** (icono de engranaje).  
   - En el menú lateral: **Product Environment Credentials** (o **Access Keys** / **API Keys** según la versión de la consola).

4. **Copia estos tres valores**  
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`  
   - **API Key** → `CLOUDINARY_API_KEY`  
   - **API Secret** → `CLOUDINARY_API_SECRET`  
   - (El API Secret a veces se muestra solo al hacer clic en “Show” o similar.)

---

## Resumen

| Variable                  | Dónde está en Cloudinary     |
|---------------------------|------------------------------|
| `CLOUDINARY_CLOUD_NAME`   | Dashboard / Product Environment Credentials → **Cloud name** |
| `CLOUDINARY_API_KEY`      | Misma sección → **API Key**  |
| `CLOUDINARY_API_SECRET`   | Misma sección → **API Secret** |

No expongas `CLOUDINARY_API_SECRET` en el cliente: solo se usa en la API route `/api/upload`.

---

## Cómo funciona en este proyecto

1. El usuario elige una imagen en un formulario (proyecto, certificación, avatar).
2. El frontend envía el archivo a **`/api/upload`** (Next.js API route).
3. La API route sube la imagen a Cloudinary con tus credenciales y devuelve la URL pública.
4. Esa URL se guarda en Firestore y se usa para mostrar la imagen.

Así se evitan problemas de CORS y las credenciales se mantienen en el servidor.
