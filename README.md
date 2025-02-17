# Planetario

Aplicación web para explorar los planetas del sistema solar, consultar sus detalles y gestionarlos como favoritos.

## Características

-   **Listado de planetas**: Obtén información sobre los planetas del sistema solar desde una API pública.
-   **Búsqueda y ordenación**: Filtra y ordena los planetas según tus preferencias.
-   **Paginación**: Navega por páginas de resultados para explorar todos los planetas.
-   **Marcado de favoritos**: Marca planetas como favoritos y guárdalos en `localStorage` para acceder rápidamente más tarde.
-   **Video de fondo**: En la vista de detalles, se utiliza un video de fondo que mejora la experiencia visual.

## Funcionalidades avanzadas

-   **Persistencia en la URL**: Los filtros aplicados (búsqueda y orden) se mantienen en la URL mediante `useSearchParams`, permitiendo compartir enlaces con configuraciones específicas.
-   **Estado global**: Se gestiona el estado global (búsqueda y orden) usando `Zustand` para una experiencia más fluida.

## Tecnologías utilizadas

-   **Next.js**: Framework para React utilizado para el desarrollo de la aplicación.
-   **JavaScript**: Lenguaje de programación utilizado en el proyecto.
-   **Tailwind CSS**: Framework de diseño para estilos rápidos y responsivos.
-   **Zustand**: Librería para gestionar el estado global de la aplicación.
-   **localStorage**: Utilizado para almacenar los planetas favoritos.

## Demo

Puedes ver la aplicación en vivo en [Planetario](https://planetario-change.vercel.app/).

## Instalación

Si quieres ejecutar el proyecto localmente en tu máquina, sigue estos pasos:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/planetario.git
    ```

2. Navega al directorio del proyecto:

```bash
cd planetario
```

3. Instala las dependencias:

```bash
npm install
```

4. Ejecuta la aplicación localmente:

```bash
npm run dev
```

5. Abre http://localhost:3000 en tu navegador.
