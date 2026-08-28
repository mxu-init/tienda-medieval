# ⚔️ Mercatum Regni — Tienda Medieval en Línea 🛡️

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
![Theme](https://img.shields.io/badge/Tema-Medieval-8C1C18?style=for-the-badge)

Proyecto desarrollado para el **Bootcamp**, consistente en una plataforma e-commerce inmersiva con temática **Medieval**. **Mercatum Regni** es el gremio virtual donde mercaderes y artesanos exponen sus mercancías más preciadas desde 1024.

---

## 📌 Enlaces del Proyecto (Entregables)

- 🎨 **Diseño en Lovable:** [Enlace público a Lovable (Modo Lectura)](https://arcane-merchant-script.lovable.app/)
- 🚀 **Despliegue en Vercel:** [Mercatum Regni en Vercel](https://tienda-medieval.vercel.app/)
- 📦 **Repositorio GitHub:** [GitHub Repository](https://github.com/mxu-init/tienda-medieval.git)

---

## 📜 Descripción del Proyecto

El proyecto sigue una arquitectura web moderna con **React** y **Vite**, complementada con una experiencia visual basada en pergaminos envejecidos, muros de piedra, faroles de latón, estandartes reales y sellos de cera.

### 🎯 Requisitos del Bootcamp Fulfillments

1. **Diseño Aceptado por el Cliente:** Maquetado conceptual y prototipado en Figma.
2. **Estética Medieval Sorteada:** Paleta de colores cálidos, pergaminos, texturas y tipografías clásicas (`Cinzel` y `EB Garamond`).
3. **Estructura Estándar:** Cada página cuenta con un **Header** unificado, contenido principal (**Main**) y un **Footer**.
4. **Header Interactivo con Clima:** Widget en tiempo real que consume la API del clima para mostrar la temperatura y el estado del tiempo actual.
5. **Buenas Prácticas de Git:** Uso riguroso de **Conventional Commits** y **Conventional Branches**.
6. **Gestión Ágil:** Pesaje de tareas e historias de usuario en **Jira**.
7. **Despliegue:** Integración continua y hosting en **Vercel**.

---

## ✨ Funcionalidades y Páginas Mínimas Viables (MVP)

1. 🏰 **Portal Principal de Bienvenida (Home):**
   - **Banner Dinámico Interactivo:** Consulta y calcula las 5 mercancías de mayor valor/precio en tiempo real consumiendo la API de productos.
   - **Presentación del Reino & Virtudes Gremiales:** Sección descriptiva (*Honor*, *Calidad*, *Confianza*) sobre pergamino con marco ornamental.
2. 🛍️ **Vitrina de Productos:**
   - Catálogo de artículos disponibles en el mercado.
   - Operaciones **CRUD** para listar, crear, editar y eliminar productos.
3. 👥 **Información de los Vendedores:**
   - Sección dedicada al gremio de artesanos con imágenes, nombres y especialidades.
4. 📖 **Historia de la Tienda:**
   - Relato temático inventado sobre los orígenes de *Mercatum Regni* desde el año 1024.
5. 👤 **Gestión de Usuarios:**
   - Listado y panel de administración de usuarios registrados.
   - Operaciones **CRUD** completas para la gestión de usuarios.

---

## 🛠️ Stack Tecnológico & APIs

- **Core:** React 19, HTML5, JavaScript (ES6+).
- **Tooling & Bundler:** Vite 8.
- **Enrutamiento:** React Router DOM v7.
- **HTTP Client:** Axios.
- **Estilos:** Custom CSS / Vanilla CSS con variables HSL/OKLCH, tipografías de Google Fonts (`Cinzel`, `EB Garamond`), texturas realistas en JPG/PNG y microanimaciones.
- **APIs Consumidas:**
  - 🛒 **Productos:** [Platzi Fake Store API - Products](https://fakeapi.platzi.com/)
  - 👤 **Usuarios:** [Platzi Fake Store API - Users](https://fakeapi.platzi.com/)
  - 🌤️ **Clima en tiempo real:** [Open-Meteo Weather API](https://open-meteo.com/en/docs)

---

## 📁 Estructura del Proyecto

```text
tienda-medieval/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── img/           # Imágenes y texturas (stone.jpg, parchment.jpg, banner.png, lantern.png, seal.png, market.jpg)
│   ├── components/
│   │   ├── Banner/        # Componente de Banner dinámico (5 productos más caros)
│   │   └── Header/        # Componente Header (Navegación + Widget del clima)
│   ├── data/              # Constantes y datos auxiliares
│   ├── pages/
│   │   └── home/          # Página de inicio Mercatum Regni (Home.jsx & Home.css)
│   ├── App.jsx            # Enrutador principal de la aplicación
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⏱️ Planificación por Sprints

- 🚀 **Sprint 1 (Viernes 28 de Agosto):**
  - Configuración inicial del repositorio React + Vite.
  - Maquetación del prototipo medieval en Lovable.
  - Implementación del Banner dinámico y diseño de la página de Inicio (Home).
  - Integración del Widget de Clima en tiempo real en el Header.
  - Estructura base de Header, Main y Footer.
  - Planificación de tareas en Jira.
  - Despliegue en Vercel.

- 🏁 **Sprint 2 y Entrega Final (Viernes 4 de Septiembre):**
  - Desarrollo completo del CRUD de Productos y Usuarios.
  - Finalización de las páginas de Vendedores e Historia.
  - Auditoría de Clean Code y validación de entregables.

---

## ⚙️ Instalación y Ejecución Local

Para ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/mxu-init/tienda-medieval.git
   cd tienda-medieval
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🤝 Convenciones y Calidad de Código

- **Conventional Commits:** `feature:`, `fix:`, `docs:`, `style:`.
- **Conventional Branches:** `feature/nombre-funcionalidad`, `fix/nombre-bug`.
- **Clean Code:** Componentes modulares, reutilizables y separación clara de responsabilidades.

---

## 👥 Integrantes del Proyecto

| Nombre | GitHub |
| :--- | :--- |
| **Mauricio Rodríguez** | [@mxu-init](https://github.com/mxu-init) |
| **William Hernández** | [@wfhgdev](https://github.com/wfhgdev) |
| **Kanstantsin Mlechka** | [@kvadrakola](https://github.com/kvadrakola) |
| **Óscar Pérez** | [@oscarperezGR](https://github.com/oscarperezGR) |
| **Marisa Ruiz** | [@Marisa-Ruiz](https://github.com/Marisa-Ruiz) |
