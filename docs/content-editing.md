# Editar proyectos con Pages CMS

## Activar el panel (una vez)

1. Publicar en GitHub los archivos de esta integración, incluido `.pages.yml`.
2. Entrar en https://app.pagescms.org e iniciar sesión con GitHub.
3. Instalar la aplicación de Pages CMS con acceso solo al repositorio `SamuelRodri/SamuDev`.
4. Abrir ese repositorio y la rama `main` en el panel.

No se necesitan contraseñas ni tokens dentro del portfolio. La sesión y el acceso de escritura los gestiona Pages CMS con GitHub.

## Estado del proyecto

El estado del desarrollo se elige en un selector: Prototipo, En desarrollo, Publicado, Finalizado o En pausa. La web traduce el valor a cada idioma. Este estado es independiente de **Mostrar en mi portfolio**: puedes mostrar un prototipo o mantener oculta la ficha de un juego publicado.

## Formulario

Cada ficha está dividida en secciones numeradas:

1. **Publicación**: estado, visibilidad y destacados.
2. **Imágenes y vídeo**: portada, galería y vídeo.
3. **Contenido en español**: todos los textos de la versión española.
4. **Content in English**: todos los textos de la versión inglesa.
5. **Datos del juego**: año, motor, plataforma, lenguaje y etiquetas.
6. **Enlaces y reconocimiento**: itch.io, GitHub y premios.
7. **Dirección de la ficha**: el identificador visible en la URL.

Las game jams usan la misma estructura adaptada a sus campos. No necesitas rellenar un identificador interno ni un nombre de archivo. Pages CMS alojado no ofrece configuración de columnas ni separadores personalizados; estos grupos son las secciones visuales admitidas por su formulario estructurado.

## Uso diario

- **Mis proyectos GameDev** y **Mis game jams**: crear o editar una ficha. Cada ficha tiene textos en español e inglés. Los textos largos son texto plano.
- **Mostrar en mi portfolio**: desactivado permite guardar un borrador incompleto. Activarlo requiere completar los campos de ambas lenguas. Desactivarlo retira la ficha de la web tras el despliegue.
- **Organizar portfolio**: usa las listas Orden de los proyectos y Orden de las game jams para definir la secuencia de arriba abajo, sin editar cada ficha. Los proyectos nuevos que no estén en la lista aparecen al final por su dirección; los borradores permanecen ocultos. El listado del editor se ordena por nombre, independientemente del orden de la web.
- **Mostrar entre los destacados**: añade la ficha a los destacados de GameDev.
- **Organizar portfolio**: selecciona el proyecto principal. Título, resumen, imagen y enlace se toman de su ficha. Si está en borrador, se oculta la portada principal. Para eliminarlo, limpia o cambia primero esta selección.
- **Imagen de portada** y **Galería de capturas**: subir imágenes o usar URLs HTTPS existentes. Las imágenes subidas se guardan en `public/images/projects`. La web adapta las rutas al prefijo de alojamiento.
- **Vídeo**: URL HTTPS de un MP4, enlace `https://www.youtube.com/watch?v=...` o ruta de un MP4 existente bajo `/videos/`. Los vídeos nuevos se alojan externamente.
- **Dirección de la ficha**: usa un valor único y consérvalo tras publicar. El identificador interno está oculto; los proyectos nuevos lo obtienen automáticamente de esta dirección.

Guardar una ficha genera un commit en `main`, pero no publica inmediatamente. Puedes guardar todos los proyectos que necesites y, cuando termines, pulsar **Publicar portfolio** en la barra lateral de Pages CMS. Ese botón ejecuta una sola vez el workflow **Deploy portfolio** con todos los cambios acumulados. Si falla la validación, la versión anterior continúa publicada; revisa el error en Actions, corrige la ficha y vuelve a publicar.

Los cambios de código siguen activando el despliegue automáticamente. Si vuelves a pulsar **Publicar portfolio** mientras hay otro despliegue en curso, GitHub cancela el anterior y conserva el más reciente.

Los borradores se excluyen del contenido generado y del JavaScript publicado. El repositorio y su historial pueden seguir mostrándolos si son públicos: no son un espacio para información confidencial.

La integración cubre los proyectos GameDev y las game jams existentes. Los bloques de ejemplo de .NET y los textos generales del portfolio siguen en código.

## Desarrollo

`npm run dev`, `npm run build` y `npm run typecheck` generan primero los datos públicos desde `content/`. Tras editar JSON localmente con el servidor abierto, ejecuta `npm run content:build` para actualizar la vista. `src/generated/` no se versiona. Ejecuta `npm test` para comprobar rutas y reglas de contenido.

Comprobación final tras conectar el panel: crear una ficha con Mostrar en mi portfolio desactivado, guardar, completar ambas traducciones, publicar y verificar su aparición. La conexión real del panel requiere iniciar sesión con la cuenta propietaria.

Documentación: https://pagescms.org/docs/quick-start/

## Motor del juego

Selecciona Unity, Unreal Engine o Godot en el desplegable de la ficha (también en game jams). Si un proyecto no tiene motor confirmado, puedes dejarlo sin seleccionar en Proyectos GameDev. La ficha muestra el icono del motor, con su nombre accesible y visible al pasar el cursor.

## Lenguajes de programación

El campo permite seleccionar más de una opción entre C#, C++, Blueprints, GDScript y Python. Las opciones elegidas aparecen juntas en las tarjetas y en la ficha del proyecto.
