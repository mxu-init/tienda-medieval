Nombre de archivos, páginas y componentes. Carpeteo.

Hojas de estilos (general y específicas en caso de necesidad):

- index.css → General
- Hoja de estilos asociada a cada componente, con el mismo nombre que el .jsx, en la misma carpeta.
- Las páginas se pueden también meter en una carpeta con el nombre de la página, y dentro el .jsx y el .css con los estilos asociados a esa página, que no estén en los generales.

Carpetas:
    components
        Ejemplo:
            Header > Header.jsx & Header.css (estilos específicos del header)
    pages
        Ejemplo:
            products > Products.jsx & Products.css (si la página necesita estilos específicos)

Componentes: Tanto el nombre de la carpeta, como de los archivos .css y .jsx de los componentes deberán estar escritos en Pascal Case y en inglés

Importante: Todos los nombres de variables, clases, y archivos (incluidas las imágenes) deberán estar en inglés y camel case.