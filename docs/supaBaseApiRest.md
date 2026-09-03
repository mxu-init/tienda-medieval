# Documentación Técnica de API REST – Tienda Medieval

Esta guía técnica especifica el contrato de la API REST del proyecto alojado en Supabase (`[https://ncqxvrgpzevmanyfkuvs.supabase.co](https://ncqxvrgpzevmanyfkuvs.supabase.co)`). Contiene la configuración de red, reglas de filtrado de PostgREST, estructura de entidades y ejemplos de consumo tanto en cURL como en Axios para la capa `src/services/`.

---

## 1. Configuración del Cliente HTTP y Entorno

Todas las peticiones a la API requieren la inyección de la clave pública (`anon`) y cabeceras de representación para garantizar que PostgREST devuelva la entidad manipulada en el cuerpo de la respuesta.

### Variables de Entorno (`.env`)

```env
VITE_SUPABASE_URL=https://ncqxvrgpzevmanyfkuvs.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase

```

### Instancia Centralizada de Axios (`src/services/api.js`)

```javascript
import axios from 'axios';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
});

export default api;

```

---

## 2. Cheat Sheet de Consultas PostgREST

Supabase expone las tablas PostgreSQL directamente mediante sintaxis de URL en la cadena de consulta (*query string*).

| Operación | Parámetro URL | Ejemplo de Uso | Descripción |
| --- | --- | --- | --- |
| **Igualdad** | `?columna=eq.VALOR` | `/users?id=eq.100` | Filtra filas donde la columna sea igual al valor. |
| **Coincidencia Parcial** | `?columna=ilike.*VALOR*` | `/products?title=ilike.*sword*` | Búsqueda por texto (no sensible a mayúsculas). |
| **Selección de Campos** | `?select=campo1,campo2` | `/users?select=id,name,email` | Retorna únicamente los campos especificados. |
| **Relaciones (Joins)** | `?select=*,alias:tabla(*)` | `/products?select=*,category:categories(*)` | Realiza un `JOIN` automático con la tabla foránea. |
| **Ordenamiento** | `?order=columna.asc|desc` | `/products?order=price.desc` | Ordena el resultado de forma ascendente o descendente. |
| **Paginación** | `?limit=N&offset=M` | `/products?limit=10&offset=0` | Limita la cantidad de registros devueltos. |

---

## 3. Especificación de Entidades y Endpoints

### 3.1. Categorías (`categories`)

Representa los gremios o familias de mercancías.

| Campo | Tipo PostgreSQL | Descripción |
| --- | --- | --- |
| `id` | `BIGINT` (PK) | Identificador único de la categoría. |
| `name` | `TEXT` | Nombre visible del gremio o categoría. |
| `slug` | `TEXT` | Identificador amigable para URLs. |
| `image` | `TEXT` | URL de la imagen representativa. |

#### Listar Categorías (`GET /categories`)

* **cURL:**
```bash
curl -X GET "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/categories?select=*" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY"

```


* **Axios (`src/services/productService.js`):**
```javascript
export const getCategories = async (signal) => {
  try {
    const response = await api.get('/categories?select=*', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener las categorías.';
    throw new Error(message, { cause: error });
  }
};

```



---

### 3.2. Productos (`products`)

Inventario de mercancías del catálogo.

| Campo | Tipo PostgreSQL | Descripción |
| --- | --- | --- |
| `id` | `TEXT` (PK) | Identificador secuencial numérico o UUID en texto. |
| `title` | `TEXT` | Nombre de la mercancía. |
| `slug` | `TEXT` | Slug identificador. |
| `price` | `NUMERIC(10,2)` | Precio en monedas de oro. |
| `description` | `TEXT` | Descripción detallada del artículo. |
| `category_id` | `BIGINT` (FK) | Referencia al ID de `categories`. |
| `images` | `TEXT[]` | Arreglo de URLs de imágenes del producto. |

#### Listar Productos con Categoría Nivel Anidado (`GET /products`)

* **cURL:**
```bash
curl -X GET "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/products?select=*,category:categories(*)" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY"

```


* **Axios (`src/services/productService.js`):**
```javascript
export const getProducts = async (signal) => {
  try {
    const response = await api.get('/products?select=*,category:categories(*)', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener las mercancías.';
    throw new Error(message, { cause: error });
  }
};

```



#### Crear Producto (`POST /products`)

* **cURL:**
```bash
curl -X POST "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/products" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "title": "Espada de Acero Valyrio",
    "price": 250,
    "description": "Forjada por maestros herreros.",
    "category_id": 1,
    "images": ["https://i.imgur.com/example.jpg"]
  }'

```


* **Axios (`src/services/productService.js`):**
```javascript
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo registrar la mercancía. Verifique los permisos RLS.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al crear el producto.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

```



#### Actualizar Producto (`PATCH /products?id=eq.ID`)

* **cURL:**
```bash
curl -X PATCH "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/products?id=eq.100" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{ "price": 280 }'

```


* **Axios (`src/services/productService.js`):**
```javascript
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.patch(`/products?id=eq.${id}`, productData);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo actualizar la mercancía.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al actualizar el producto.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

```



#### Eliminar Producto (`DELETE /products?id=eq.ID`)

* **cURL:**
```bash
curl -X DELETE "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/products?id=eq.100" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY" \
  -H "Prefer: return=representation"

```


* **Axios (`src/services/productService.js`):**
```javascript
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products?id=eq.${id}`);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo eliminar la mercancía.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al eliminar el producto.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

```



---

### 3.3. Usuarios (`users`)

Registro de habitantes y administradores del reino.

| Campo | Tipo PostgreSQL | Descripción |
| --- | --- | --- |
| `id` | `TEXT` (PK) | Identificador del usuario. |
| `email` | `TEXT` (Unique) | Correo electrónico de acceso. |
| `password` | `TEXT` | Contraseña del usuario. |
| `name` | `TEXT` | Nombre completo del usuario. |
| `role` | `TEXT` | Rol asignado (`customer` o `admin`). |
| `avatar` | `TEXT` | URL del retrato o imagen de perfil. |

#### Listar Usuarios (`GET /users`)

* **cURL:**
```bash
curl -X GET "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/users?select=*" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY"

```


* **Axios (`src/services/userService.js`):**
```javascript
export const getUsers = async (signal) => {
  try {
    const response = await api.get('/users?select=*', { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw error;
    }
    const message = error.response?.data?.message || 'Error al obtener la lista de usuarios.';
    throw new Error(message, { cause: error });
  }
};

```



#### Crear Usuario (`POST /users`)

* **cURL:**
```bash
curl -X POST "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/users" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "name": "Arthur Pendragon",
    "email": "arthur@camelot.com",
    "password": "excalibur_pass",
    "role": "admin",
    "avatar": "https://i.imgur.com/avatar.jpg"
  }'

```


* **Axios (`src/services/userService.js`):**
```javascript
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo registrar el usuario. Verifique los permisos de acceso.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al registrar el usuario.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

```



#### Actualizar Usuario (`PATCH /users?id=eq.ID`)

* **cURL:**
```bash
curl -X PATCH "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/users?id=eq.100" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{ "role": "admin" }'

```


* **Axios (`src/services/userService.js`):**
```javascript
export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`/users?id=eq.${id}`, userData);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo actualizar el usuario. Verifique las políticas RLS.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al actualizar el usuario.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

```



#### Eliminar Usuario (`DELETE /users?id=eq.ID`)

* **cURL:**
```bash
curl -X DELETE "https://ncqxvrgpzevmanyfkuvs.supabase.co/rest/v1/users?id=eq.100" \
  -H "apikey: TU_ANON_KEY" \
  -H "Authorization: Bearer TU_ANON_KEY" \
  -H "Prefer: return=representation"

```


* **Axios (`src/services/userService.js`):**
```javascript
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users?id=eq.${id}`);
    if (!response.data || response.data.length === 0) {
      throw new Error('No se pudo eliminar el usuario.');
    }
    return response.data[0];
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al eliminar el usuario.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message, { cause: error });
  }
};

```



---

## 4. Códigos de Respuesta HTTP y Seguridad RLS

| Código HTTP | Significado | Comportamiento en Supabase |
| --- | --- | --- |
| **`200 OK`** | Petición exitosa. | Retorna el objeto o arreglo solicitado. Si falta una regla RLS de `UPDATE` o `DELETE`, PostgREST responderá `200 OK` con un arreglo vacío `[]`. |
| **`201 Created`** | Registro creado. | Devuelve el objeto creado gracias a `Prefer: return=representation`. |
| **`400 Bad Request`** | Error de sintaxis o tipo de datos. | Ocurre al violar restricciones de columna (ej. duplicados de email o valores nulos). |
| **`401 Unauthorized`** | Error de autenticación. | Falta enviar la cabecera `apikey` o el `Authorization: Bearer`. |
| **`404 Not Found`** | Endpoint no encontrado. | La tabla especificada no existe en la base de datos. |