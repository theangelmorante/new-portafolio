# Portfolio Personal - Cyberpunk Style

Portfolio personal construido con Next.js 15, TypeScript, Tailwind CSS y Firebase. Diseñado con una estética cyberpunk minimalista siguiendo los principios de Atomic Design.

## 🚀 Características

- **Diseño Moderno**: Estética cyberpunk con toques minimalistas
- **Atomic Design**: Estructura de componentes organizada (atoms, molecules, organisms, templates)
- **Full Stack**: Frontend y backend integrados con Next.js
- **Firebase Integration**: 
  - Firestore para almacenar datos
  - Storage para imágenes
  - Authentication para área privada
- **Área de Administración**: Panel privado para agregar/editar contenido
- **Responsive**: Diseño adaptable a todos los dispositivos
- **TypeScript**: Tipado estático para mayor seguridad

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase con proyecto configurado

## 🛠️ Instalación

1. Clona el repositorio o navega al directorio del proyecto

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Copia `.env.example` a `.env.local`
   - Completa las variables de Firebase con tus credenciales

4. Configura Firebase:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Authentication (Email/Password)
   - Crea una base de datos Firestore
   - Configura Storage para imágenes
   - Crea un usuario de autenticación para acceder al panel admin

5. Inicializa Firestore:
   - Crea las siguientes colecciones en Firestore:
     - `projects`
     - `experiences`
     - `certifications`
     - `education`
     - `skills`
     - `personalInfo` (documento con ID: `main`)

6. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── admin/             # Área de administración
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/
│   ├── atoms/             # Componentes básicos
│   ├── molecules/         # Componentes compuestos
│   ├── organisms/         # Componentes complejos
│   └── templates/         # Plantillas de página
├── context/               # Context API para estado global
├── lib/                   # Utilidades y configuración
│   ├── firebase.ts        # Configuración de Firebase
│   ├── firestore.ts       # Funciones de Firestore
│   ├── storage.ts         # Funciones de Storage
│   └── auth.ts            # Funciones de autenticación
└── types/                 # Tipos de TypeScript
```

## 🎨 Personalización

### Colores Cyberpunk

Los colores están definidos en `tailwind.config.ts`:
- `cyber-cyan`: #00ffff
- `cyber-magenta`: #ff00ff
- `cyber-green`: #00ff41
- `cyber-purple`: #9d00ff
- `cyber-blue`: #0080ff

### Componentes

Los componentes siguen Atomic Design:
- **Atoms**: Button, Input, Card, Heading, etc.
- **Molecules**: ProjectCard, ExperienceCard, etc.
- **Organisms**: Hero, About, Skills, Projects, etc.
- **Templates**: AdminDashboard

## 🔐 Área de Administración

Accede a `/admin/login` para iniciar sesión y gestionar tu contenido:

- Agregar/editar proyectos
- Agregar/editar experiencias profesionales
- Agregar/editar certificaciones
- Agregar/editar educación
- Agregar/editar habilidades
- Editar información personal

## 📝 Uso

1. **Configura tu información personal**: Ve a Admin > Editar Info Personal
2. **Agrega tus proyectos**: Admin > Agregar Proyecto
3. **Agrega tus experiencias**: Admin > Agregar Experiencia
4. **Agrega certificaciones**: Admin > Agregar Certificación
5. **Agrega educación**: Admin > Agregar Educación
6. **Agrega habilidades**: Admin > Agregar Habilidad

## 🚢 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en la configuración de Vercel
3. Despliega automáticamente

### Otros proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📄 Licencia

Este proyecto es de uso personal.

## 🤝 Contribuciones

Este es un proyecto personal, pero las sugerencias son bienvenidas.

---

Desarrollado con ❤️ usando Next.js y Firebase
