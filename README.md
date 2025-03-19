# Book Reader App

Esta es una aplicación web desarrollada con React y JavaScript utilizando Vite. La aplicación permite buscar, filtrar y explorar una lista de libros consumiendo la API pública An API of Ice And Fire. Además, cuenta con funcionalidades para agregar libros a favoritos y un formulario (maquetado) para agregar nuevos libros. Se utilizan las siguientes tecnologías y librerías:

    - React y Vite para el desarrollo de la aplicación.
    - React Router DOM para el manejo de la navegación.
    - Headless UI para componentes de interacción.
    - Tailwind CSS (v3.4.17) para los estilos, con una paleta de colores personalizada.
    - @tanstack/react-table para mostrar, ordenar, buscar y filtrar la lista de libros.
    - Formik para el manejo y validación de formularios.
    - Jest para escribir pruebas unitarias.
    - Storybook para documentar y testear cada uno de los componentes.

# Cómo ejecutar la aplicación

# Instalar dependencias

Asegúrate de tener instalado Node.js (versión LTS recomendada). Luego, en la raíz del proyecto, ejecuta:

npm install

# Ejecutar en modo desarrollo

Para iniciar la aplicación en modo desarrollo con Vite, utiliza:

npm run dev

Esto abrirá la aplicación en tu navegador en la URL indicada (por defecto http://localhost:3000 o similar).

# Construir para producción

Para generar los archivos optimizados para producción:

npm run build
Y para previsualizar la build:

npm run preview

# Cómo ejecutar las pruebas unitarias

La aplicación utiliza Jest para pruebas unitarias. Para ejecutar las pruebas, asegúrate de tener configurado correctamente Jest (se utiliza jest-environment-jsdom para simular un entorno de navegador).

# Instalar dependencias de testing

Si aún no las has instalado, ejecuta:

npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# Ejecutar las pruebas

Agrega el siguiente script en el package.json (si no existe):

"scripts": {
"test": "jest"
}

Luego, ejecuta:

npm test
Esto ejecutará todas las pruebas definidas en archivos con extensión .test.js o .spec.js.

# Storybook

Se ha configurado Storybook para documentar y testear cada uno de los componentes de la aplicación.

# Iniciar Storybook

Para levantar Storybook, ejecuta:

npm run storybook
Esto abrirá Storybook en http://localhost:6006, donde podrás explorar las historias de cada componente.

# Decisiones técnicas y arquitectónicas

# Elección de React y Vite:

Se eligió React por su robustez y ecosistema, y Vite por su rapidez en el desarrollo y configuración mínima. Vite permite una experiencia de desarrollo fluida con recarga en caliente y tiempos de build muy rápidos.

# React Router DOM:

Se utiliza para gestionar la navegación de la aplicación de manera declarativa, facilitando la creación de rutas para vistas como "Inicio", "Detalles", "Favoritos" y "Nuevo Libro".

# Tailwind CSS y Headless UI:

Tailwind CSS permite un desarrollo de estilos rápido y consistente mediante clases utilitarias, mientras que Headless UI ofrece componentes accesibles y personalizables sin imponer estilos predeterminados, permitiendo integrarlos a la estética definida en el theme.

# @tanstack/react-table:

Se utiliza para la gestión de la tabla de libros, permitiendo funciones avanzadas como ordenamiento, filtrado y búsqueda, de manera modular y extensible.

# Formik para formularios:

Se eligió Formik para manejar la validación y el estado de los formularios de forma sencilla y escalable.

# Jest y Storybook:

Jest se utiliza para asegurar la calidad del código mediante pruebas unitarias, mientras que Storybook documenta y permite testear visualmente cada componente de la aplicación.

# Mejoras pendientes

Optimización de filtros y ordenamiento:
Aunque se implementa una funcionalidad básica, se podría mejorar la experiencia de usuario agregando paginación, filtros avanzados y mejor manejo de estados de carga y error.

# Integración con una API real para el CRUD:

Actualmente, el formulario de "Nuevo Libro" es solo maquetado. Se podría implementar la integración con una API que permita gestionar la creación, actualización y eliminación de libros.

# Mayor cobertura de pruebas unitarias y de integración:

Se planea añadir más pruebas para cubrir casos de error y asegurar el funcionamiento en todos los flujos de la aplicación.

# ¿Qué harías de manera diferente si se le asignara más tiempo?

Mejorar la experiencia de usuario (UX):
Implementaría animaciones y transiciones más suaves, además de un diseño responsivo más refinado para dispositivos móviles.

# Implementar autenticación y autorización:

Integrar un sistema de autenticación para que los usuarios puedan guardar sus favoritos en la nube y personalizar la experiencia.

# Optimización del rendimiento:

Realizar un análisis de rendimiento y optimizar la carga de datos, posiblemente implementando técnicas de lazy loading y memoización avanzada.

# Testing end-to-end (E2E):

Además de las pruebas unitarias, se implementarían pruebas E2E utilizando herramientas como Cypress o Playwright para asegurar la integridad de la aplicación en escenarios reales.
