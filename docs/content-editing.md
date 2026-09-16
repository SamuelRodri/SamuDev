# Editar proyectos con Pages CMS

## Activar el panel (una vez)

1. Publicar en GitHub los archivos de esta integración, incluido `.pages.yml`.
2. Entrar en https://app.pagescms.org e iniciar sesión con GitHub.
3. Instalar la aplicación de Pages CMS con acceso solo al repositorio `SamuelRodri/SamuDev`.
4. Abrir ese repositorio y la rama `main` en el panel.

No se necesitan contraseñas ni tokens dentro del portfolio. La sesión y el acceso de escritura los gestiona Pages CMS con GitHub.

## Uso diario

- **Proyectos GameDev** y **Game jams**: crear o editar una ficha. Cada ficha tiene textos en español e inglés. Los textos largos son texto plano.
- **Publicado**: desactivado permite guardar un borrador incompleto. Activarlo requiere completar los campos de ambas lenguas. Desactivarlo retira la ficha de la web tras el despliegue.
- **Orden**: los números menores aparecen primero.
- **Destacado**: añade la ficha a los destacados de GameDev.
- **Portada GameDev**: selecciona el proyecto principal. Título, resumen, imagen y enlace se toman de su ficha. Si está en borrador, se oculta la portada principal. Para eliminarlo, limpia o cambia primero esta selección.
- **Portada** y **Capturas**: subir imágenes o usar URLs HTTPS existentes. Las imágenes subidas se guardan en `public/images/projects`. La web adapta las rutas al prefijo de alojamiento.
- **Vídeo**: URL HTTPS de un MP4, enlace `https://www.youtube.com/watch?v=...` o ruta de un MP4 existente bajo `/videos/`. Los vídeos nuevos se alojan externamente.
- **URL** e **Identificador estable**: valores únicos. Conserva la URL de las fichas publicadas para no romper enlaces compartidos.

Guardar en `main` genera un commit y activa GitHub Actions. La web cambia cuando termina el workflow **Deploy portfolio**. Si falla la validación, la versión anterior continúa publicada; revisa el error en Actions, corrige la ficha y guarda de nuevo.

Los borradores se excluyen del contenido generado y del JavaScript publicado. El repositorio y su historial pueden seguir mostrándolos si son públicos: no son un espacio para información confidencial.

La integración cubre los proyectos GameDev y las game jams existentes. Los bloques de ejemplo de .NET y los textos generales del portfolio siguen en código.

## Desarrollo

`npm run dev`, `npm run build` y `npm run typecheck` generan primero los datos públicos desde `content/`. Tras editar JSON localmente con el servidor abierto, ejecuta `npm run content:build` para actualizar la vista. `src/generated/` no se versiona. Ejecuta `npm test` para comprobar rutas y reglas de contenido.

Comprobación final tras conectar el panel: crear una ficha con Publicado desactivado, guardar, completar ambas traducciones, publicar y verificar su aparición. La conexión real del panel requiere iniciar sesión con la cuenta propietaria.

Documentación: https://pagescms.org/docs/quick-start/
