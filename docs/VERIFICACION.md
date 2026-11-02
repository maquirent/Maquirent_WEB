# Verificación del mockup

Revisión local realizada el 2 de noviembre de 2026.

- `npm run build`: compilación correcta de todas las rutas de Next.js, con verificación TypeScript incluida.
- `npm run typecheck`: sin errores.
- Chrome: portada en 1440 × 1000, 820 × 1180 y 390 × 844 píxeles CSS. Sitio público, login y editores del panel revisados en tablet y celular; sin desbordamiento horizontal de la página ni imágenes rotas detectadas. La tabla de catálogo tiene desplazamiento horizontal propio en celular.
- Catálogo público: filtro de camiones produce un equipo; búsqueda de excavadora devuelve excavadora y miniexcavadora; llantas muestra el estado pendiente; detalle de equipo abre un diálogo, presenta el enlace de WhatsApp correcto y cierra con Escape.
- Formulario público: validación y confirmación visual con datos ficticios. No envió consultas.
- Enlace de servicio: `?servicio=traslados` selecciona **Traslado de maquinaria** en el formulario de contacto.
- Panel: guardado de teléfono, enlace social y segunda ubicación; valores conservados al recargar y reflejados en la vista pública.
- Catálogo administrativo: creación de un producto temporal con imagen de biblioteca, edición, cambio de visibilidad y eliminación con confirmación. El producto oculto no apareció en la categoría pública.
- Apartados del catálogo: cambio de descripción y fotografía de una categoría reflejado en la home.
- Inicio: cambio de título y fotografía reflejado en el banner público.
- Restauración: se eliminaron las ediciones de prueba usando **Restaurar mockup**. El resultado final conserva los cuatro productos, la ubicación original, los datos públicos de contacto y las fotografías iniciales.
- Se revisaron los mensajes de advertencia/error del navegador; no se detectaron errores de la aplicación en la revisión.

## Límite de la revisión

La extensión de Chrome no permitió seleccionar archivos locales mediante automatización porque tiene deshabilitado el acceso a URL de archivos. Se verificaron los cambios de imágenes mediante la biblioteca incluida. La selección manual de un archivo desde el equipo no quedó verificada en esta sesión. El selector de la interfaz admite JPG, PNG y WebP de hasta 1.5 MB y no sube archivos a un servidor.

La autenticación real, las políticas de Supabase, la persistencia compartida, las consultas comerciales y el despliegue pertenecen a la siguiente fase. La revisión inicial no modificó la página anterior ni realizó un despliegue. La publicación del código en GitHub se registra por separado del despliegue del sitio.

Las capturas locales se encuentran en `artifacts/` y están excluidas de Git.
