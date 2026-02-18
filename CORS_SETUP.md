# Configuración de CORS para Firebase Storage en Vercel

## 🔧 Solución para Errores de CORS en Producción

El error de CORS que estás experimentando se debe a que Firebase Storage necesita configuración CORS explícita cuando se accede desde dominios externos (como Vercel).

## 📋 Pasos para Resolver el Problema

### 1. Instalar Google Cloud SDK

Si no tienes `gsutil` instalado:

```bash
# macOS
brew install google-cloud-sdk

# O descarga desde: https://cloud.google.com/sdk/docs/install
```

### 2. Autenticarse en Google Cloud

```bash
gcloud auth login
```

### 3. Seleccionar tu Proyecto de Firebase

```bash
gcloud config set project portafolio-angel-morante
```

### 4. Configurar CORS en Firebase Storage

Ejecuta este comando desde la raíz de tu proyecto:

```bash
gsutil cors set cors.json gs://portafolio-angel-morante.firebasestorage.app
```

**Nota:** El nombre del bucket es `portafolio-angel-morante.firebasestorage.app` según tu configuración.

### 5. Verificar la Configuración CORS

Para verificar que la configuración se aplicó correctamente:

```bash
gsutil cors get gs://portafolio-angel-morante.firebasestorage.app
```

Deberías ver el contenido del archivo `cors.json` que acabas de aplicar.

## 🔍 Verificación Adicional

### Verificar Variables de Entorno en Vercel

Asegúrate de que todas las variables de entorno de Firebase estén configuradas en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Verifica que estas variables estén configuradas:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Verificar Reglas de Firebase Storage

Asegúrate de que las reglas de Storage permitan acceso:

1. Ve a Firebase Console → Storage → Rules
2. Verifica que tengas reglas similares a:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
    
    match /certifications/{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
    
    match /avatars/{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
  }
}
```

## 🚨 Solución Alternativa si `gsutil` no Funciona

Si no puedes usar `gsutil`, puedes configurar CORS desde Google Cloud Console:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto: `portafolio-angel-morante`
3. Ve a **Cloud Storage** → **Buckets**
4. Encuentra tu bucket: `portafolio-angel-morante.firebasestorage.app`
5. Haz clic en el bucket → **Permissions** → **CORS**
6. Haz clic en **Edit CORS configuration**
7. Pega el contenido de `cors.json` (solo el objeto dentro del array)
8. Guarda los cambios

## ✅ Verificación Final

Después de configurar CORS:

1. Espera unos minutos para que los cambios se propaguen
2. Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)
3. Intenta subir una imagen nuevamente desde tu aplicación en Vercel
4. Verifica en DevTools → Network que las solicitudes ya no muestren errores CORS

## 📝 Notas Importantes

- Los cambios de CORS pueden tardar unos minutos en propagarse
- Si agregas un nuevo dominio de Vercel, actualiza `cors.json` y vuelve a ejecutar `gsutil cors set`
- El archivo `cors.json` incluye `*.vercel.app` para cubrir todos los subdominios de Vercel

## 🆘 Si el Problema Persiste

Si después de seguir estos pasos aún tienes errores:

1. Verifica que el bucket de Storage sea el correcto
2. Asegúrate de estar autenticado correctamente en Firebase
3. Verifica que las reglas de Storage permitan lectura pública
4. Revisa la consola del navegador para mensajes de error específicos
