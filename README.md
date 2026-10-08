# Formar e investigar la DPI

Sitio único que integra dos formaciones docentes de la UTPL sobre la competencia genérica **Desarrollo Personal Integral (DPI)**, con un **registro de avance** común:

| Formación | Enfoque | Pregunta guía | Página |
|---|---|---|---|
| Competencias Humanas para el Futuro (CHF) | Formar la competencia | ¿Cómo desarrollo la DPI en mi asignatura? | `formacion.html` |
| Evidencia trazable | Investigar la competencia | ¿Cómo ha abordado la literatura científica la DPI en educación superior? | `investigacion.html` |

**Ver el sitio:** https://mvagila.github.io/cursoVibe_coding/ *(una vez publicado en ese repositorio)*

## Páginas

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Página inicial: enfoque de las dos formaciones, diferencias, cómo se conectan, orientador «¿Por dónde empiezo?», avance personal y acceso |
| `formacion.html` | CHF: 4 unidades con contenidos para marcar, reflexión por unidad, borrador del microproyecto (descargable) y componentes de la evaluación |
| `investigacion.html` | Evidencia trazable: ruta de 5 etapas con prácticas interactivas, contradicciones, rúbrica, uso de IA, plantillas y ejemplo resuelto |
| `avance.html` | Mi avance: identificación, detalle con fechas y exportación del registro (.json) para el aula virtual |
| `docente.html` | Panel docente: carga los registros de los estudiantes, verifica que no se hayan editado y consolida la tabla (.csv) |
| `assets/progreso.js` | Registro de avance compartido por todas las páginas |
| `assets/estilo.css` | Estilos compartidos |
| `plantillas/` | Plantillas de las etapas de investigación |
| `ejemplo/` | Síntesis aprobada del piloto (v1.1) |

## Cómo funciona el seguimiento del avance

GitHub Pages solo publica archivos: no tiene servidor ni base de datos. Por eso:

1. Cada estudiante avanza en el sitio y sus marcas, con fecha y hora, se guardan **en su navegador**.
2. En **Mi avance**, el estudiante escribe su nombre y pulsa **Exportar mi avance**. Se descarga `avance_dpi_<nombre>_<fecha>.json`.
3. El estudiante **sube ese archivo a una tarea del aula virtual** (Canvas).
4. El docente descarga los archivos de la tarea y los carga en **docente.html**. El panel muestra el porcentaje de cada formación, la última actividad, las reflexiones y el borrador del microproyecto, y marca como **«editado o dañado»** cualquier archivo modificado a mano.

Qué cuenta como avance:

- **Formación (41 actividades):** 26 contenidos revisados, 4 reflexiones, 7 componentes del borrador del microproyecto y 4 entregas de evaluación.
- **Investigación (17 actividades):** en cada una de las 5 etapas, etapa revisada, práctica completada y entregable subido; además, el detective de contradicciones y la autoevaluación con la rúbrica.

Limitaciones: las marcas son **autodeclaradas** y el avance no se sincroniza entre dispositivos. Para pasarlo a otro equipo se usa **Restaurar desde archivo**. Las calificaciones oficiales siguen en el aula virtual.

## Publicar

1. Suba todo el contenido de esta carpeta a la raíz del repositorio, respetando las subcarpetas `assets/`, `plantillas/` y `ejemplo/`.
2. Active **Settings → Pages → Deploy from a branch → main / (root)**.
3. Si reemplaza el `index.html` anterior de `cursoVibe_coding`, la dirección principal pasa a mostrar la página inicial, y el curso de investigación queda en `/investigacion.html`.

La plantilla `etapa3_propuesta_asistente_plantilla.xlsx` **no se publica** en el sitio: el docente la entrega después de la puntuación individual de la etapa 3.

## Créditos

Competencias Humanas para el Futuro: docente Dra. Cristina Díaz de la Cruz; contenidos tomados del sitio del curso CHF. Evidencia trazable: adaptación de la guía 08 del curso Vibe Coding CEDIA 2026, autoría de Martha Vanessa Agila Palacios. UTPL · 2026.
