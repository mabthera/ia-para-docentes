# Inteligencia artificial para docentes

Web de apoyo a una formación sobre inteligencia artificial aplicada a la docencia, creada por **David Rodríguez**, profesor de Matemáticas y divulgador en IA.

El recorrido consta de cuatro fases: fundamentos, herramientas online, asistentes de escritorio y trabajo en local. El bloque de fundamentos está desarrollado; las otras fases se encuentran en preparación.

## Organización

- `index.html`: portada y acceso a las cuatro fases.
- `fundamentos.html`, `online.html`, `escritorio.html` y `local.html`: páginas de las fases.
- `assets/`: imágenes utilizadas por la web.
- Archivos `.css` y `.js`: estilos e interacciones de la presentación.
- `criterios-diseno.md`: decisiones de diseño y contenido para seguir desarrollando el proyecto.

La web es estática: no necesita instalación, compilación ni claves para funcionar. Para revisarla en el ordenador, abre `index.html` en un navegador y conserva la estructura de archivos y carpetas.

## Publicación en GitHub Pages

1. Crea un repositorio y sube **el contenido de esta carpeta** a su raíz, de forma que `index.html` quede en el nivel principal junto a `assets/`. No subas la carpeta contenedora como subcarpeta si quieres que la portada sea la página principal del sitio.
2. En el repositorio, abre **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch** y elige la rama que contiene los archivos y la carpeta **`/ (root)`**. Guarda la configuración.
3. Cuando termine la publicación, GitHub mostrará la dirección del sitio en esa misma sección. Esa es la dirección que se puede compartir con los asistentes. Los cambios posteriores en la rama publicada actualizarán el sitio.

Consulta la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) si cambia alguna opción de configuración. El contenido publicado será accesible a través de la web; revisa los archivos antes de subirlos.

## Autoría y licencia

El contenido original de este recurso es obra de **David Rodríguez** y se comparte bajo la licencia [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Los materiales de terceros pueden tener derechos y condiciones propias.
