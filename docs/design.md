# Guía de Estándares y Convenciones de Desarrollo Web

Este documento establece las normas obligatorias de desarrollo y organización del código para el equipo de desarrollo. Su cumplimiento es **estricto** para garantizar la mantenibilidad, escalabilidad y coherencia de todos nuestros proyectos React/Vite.

---

## 1. Nomenclatura, Idioma y Contenido de Usuario

* **Idioma de Código:** Todo el código fuente (variables, funciones, clases, nombres de archivos, carpetas y commits) debe estar escrito en **inglés**.
* **Idioma de Interfaz (UI):** Todo el contenido visible para el usuario final (párrafos, títulos, mensajes de error, placeholders, labels y texto en botones) debe estar obligatoriamente en **español**.
* **Archivos y Variables Generales:** Nombres en `camelCase` (ej. `userData`, `productCardImg.jpg`).
* **Componentes (`components/`):** Tanto las carpetas como sus archivos `.jsx` y `.css` deben escribirse en **PascalCase** (ej. `Header/Header.jsx`).
* **Páginas (`pages/`):** Las carpetas van estrictamente en **minúsculas** y sus archivos `.jsx` y `.css` deben escribirse en **PascalCase** (ej. `products/Products.jsx`).

---

## 2. Estructura de Proyecto y Carpeteo

La arquitectura del proyecto sigue un enfoque modular basado en componentes y páginas.

```text
src/
├── assets/             # Imágenes y recursos estáticos locales
├── components/         # Componentes reutilizables de UI (Carpetas en PascalCase)
│   └── Header/
│       ├── Header.jsx
│       └── Header.css
├── pages/              # Páginas o vistas principales (Carpetas en minúsculas)
│   └── products/
│       ├── Products.jsx
│       └── Products.css
├── index.css           # Estilos globales de me la aplicación
└── main.jsx            # Punto de entrada de la aplicación

```

---

## 3. Código Limpio y Sin Comentarios (Clean Code)

* **Prohibido el uso de comentarios:** El código debe ser autoexplicativo por sí mismo. Si una función o variable requiere un comentario para entenderse, debe ser refactorizada o renombrada para expresar su intención con claridad.
* **Funciones pequeñas y de responsabilidad única (Single Responsibility Principle):** Cada componente o función debe hacer solo una cosa y hacerla bien.
* **Nombres descriptivos y con sentido:**
* Usa nombres precisos para funciones y variables en inglés (ej. `fetchUserProfile` en lugar de `getData`, `isUserLoggedIn` en lugar de `flag`).
* Evita abreviaturas confusas (ej. `productIndex` en lugar de `idx` o `p`).


* **Manejo de condicionales:** Prioriza retornos tempranos (*early returns*) y guardas (*guard clauses*) para evitar anidamientos profundos de estructuras `if-else`.
* **Código muerto y variables sin usar:** Queda totalmente prohibido dejar código comentado, funciones no utilizadas o importaciones no requeridas en los archivos entregados.

---

## 4. Hoja de Estilos (CSS)

1. **Estilos Globales (`index.css`):**
* Contiene reseteos de CSS, variables globales (colores, tipografías, espaciados) y clases de utilidad comunes a todo el proyecto.


2. **Estilos Específicos:**
* Cada componente o página que requiera estilos propios tendrá su propia hoja de estilos `.css` dentro de su carpeta correspondiente.
* El archivo `.css` debe tener **exactamente el mismo nombre** que el archivo `.jsx` al que acompaña (en PascalCase).
* **Regla de encapsulamiento:** Usa clases específicas o módulos CSS para evitar que los estilos de un componente afecten accidentalmente a otros.

---

## 5. Gestión de Recursos Estáticos (Imágenes)

* **Imágenes locales por defecto:** Todas las imágenes y recursos multimedia de la interfaz deben estar descargados y almacenados físicamente dentro del proyecto (en la carpeta `src/assets/` o subcarpetas asociadas).
* **Restricción de enlaces externos:** No se permite hardcodear imágenes hospedadas en servidores externos ni usar CDNs externos para recursos UI.
* **Excepción única:** La única excepción permitida para renderizar imágenes mediante URLs externas es cuando los datos e imágenes provienen dinámicamente del consumo de una API a través de **Axios**.
* **Nomenclatura:** Los nombres de los archivos de imagen locales deben cumplir la convención `camelCase` y estar en inglés (ej. `heroBannerMobile.webp`).

---

## 6. Tecnologías, Librerías y Enrutado

El stack oficial del proyecto está fijado. No se deben añadir librerías adicionales para resolver tareas cubiertas por el stack base sin la aprobación previa del equipo.

* **Lenguaje:** JavaScript (ES6+).
* **Entorno / Bundler:** Vite.
* **Consumo de APIs:** Axios.
* **Linter y Calidad:** ESLint (debe ejecutarse sin errores antes de cada subida a producción o PR).
* **Enrutado (`react-router-dom`):**
* Las rutas definidas en el atributo `path` deben seguir estrictamente la convención estándar en **`kebab-case`** (letras minúsculas separadas por guiones).
* *Ejemplos:*
* `<Route element="{<UserProfile" path="/user-profile"/>} />`
* `<Route element="{<ProductDetails" path="/product-details/:id"/>} />`

---

## 7. Accesibilidad Web (WCAG Compliance)

Es obligatorio construir componentes acordes a las pautas de accesibilidad **WCAG 2.1 (Nivel AA)**:

1. **Semántica HTML:** Utilizar etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<button>`, etc.) en lugar de abusar de `<div>`.
2. **Imágenes:** Todas las etiquetas `<img>` deben llevar el atributo `alt` obligatorio con una descripción clara en español para el usuario (salvo que sea puramente decorativa, en cuyo caso llevará `alt=""`).
3. **Formularios:** Todos los inputs deben estar enlazados explícitamente a su `<label>` correspondiente mediante los atributos `id` y `htmlFor`.
4. **Navegación por Teclado:** Asegurar que todos los elementos interactivos sean accesibles mediante la tecla `Tab` y que mantengan un indicador visual claro de foco (`:focus-visible`).
5. **Contraste:** Garantizar un ratio de contraste adecuado entre texto y fondo según la normativa WCAG AA.

---