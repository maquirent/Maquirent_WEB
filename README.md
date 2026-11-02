# Maquirent — propuesta visual

Mockup navegable en Next.js y TypeScript para revisar y aprobar la nueva identidad del sitio de Maquirent Guatemala. Esta fase incluye las vistas públicas, el login visual y el panel de contenidos con almacenamiento local. No tiene conexión a Supabase, autenticación real ni envío de formularios.

## Abrir el proyecto

```bash
npm install
npm run dev
```

Abre http://127.0.0.1:3000. Para revisar el panel no hacen falta credenciales: en `/login`, selecciona **Entrar al panel de demostración**.

```bash
npm run typecheck
npm run build
```

## Vistas

| Ruta                            | Contenido                                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` y `/home`                   | Inicio: fotografía principal, categorías, servicios, nosotros, proceso y contacto                                                              |
| `/nosotros`                     | Presentación de la empresa y flota                                                                                                             |
| `/productos`                    | Catálogo con búsqueda, filtros y detalle de equipo                                                                                             |
| `/productos/maquinaria-pesada`  | Maquinaria pesada                                                                                                                              |
| `/productos/camiones-de-volteo` | Camiones de volteo                                                                                                                             |
| `/productos/llantas-de-trabajo` | Apartado de llantas, pendiente de productos reales                                                                                             |
| `/servicios`                    | Maquinaria en renta, traslado de maquinaria y traslado de materiales                                                                           |
| `/contacto`                     | Datos de contacto, redes, ubicaciones y formulario visual                                                                                      |
| `/login`                        | Propuesta del acceso de la empresa                                                                                                             |
| `/dashboard`                    | Resumen y accesos rápidos                                                                                                                      |
| `/dashboard/inicio`             | Edición de textos y fotografía del banner principal                                                                                            |
| `/dashboard/contacto`           | Teléfono, WhatsApp, correo, horarios, logo, enlaces sociales y ubicaciones                                                                     |
| `/dashboard/catalogo`           | Crear, editar, ocultar o eliminar productos; cambiar su categoría y fotografías; editar las portadas, nombres y descripciones de los apartados |

## Funcionamiento de la demostración

- Los cambios se guardan en `localStorage`, clave `maquirent-mockup-v1`, solo en el navegador que los realiza. Se actualizan también en otras pestañas del mismo origen.
- Los archivos subidos se leen localmente: no se cargan a un servidor. Límite por imagen: 1.5 MB (JPG, PNG o WebP). La capacidad total depende del navegador; se informa cuando no es posible guardar.
- El botón **Restaurar mockup** del panel devuelve los textos, productos e imágenes originales de la propuesta.
- El formulario público valida los campos y muestra una confirmación visual; no almacena consultas ni envía correos o mensajes.
- Los enlaces de WhatsApp abren una conversación con texto preparado. La persona decide si lo envía.
- El login no comprueba credenciales. El acceso de demostración al panel es intencionalmente abierto; no debe utilizarse como control de acceso de producción.
- Se conservó el archivo `.env` existente, se excluyó de Git y no se consumen sus claves desde este prototipo.

## Identidad y contenido

El logo y las fotografías iniciales proceden del [repositorio anterior suministrado](https://github.com/DiederichSolis/MAQUIRENT). Se conservaron los colores `#FFBF00` y `#EF9B0F`, acompañados de carbón, blanco y grises neutros. Las fotografías se optimizaron para la web. Las tipografías se sirven localmente.

Los textos comerciales son una propuesta para aprobación. Los datos de contacto se tomaron del sitio/repo anterior; conviene confirmar su vigencia antes de publicar. No se inventaron precios, disponibilidad, especificaciones, testimonios, cifras de clientes ni marcas representadas. La imagen de llanta es una referencia externa rotulada como tal; el catálogo de esa categoría se mantiene vacío hasta contar con datos reales.

Consulta [las referencias y decisiones de diseño](docs/REFERENCIAS.md).

Los resultados y límites de las pruebas están en [la verificación del mockup](docs/VERIFICACION.md).

## Siguiente fase, después de aprobar el diseño

Conectar Supabase Auth para personal autorizado; modelar información de contacto, ubicaciones, portada, categorías y productos; configurar Storage y sus políticas; implementar operaciones protegidas, tratamiento de consultas y despliegue. Esta fase no aplica migraciones ni altera el sitio anterior.
