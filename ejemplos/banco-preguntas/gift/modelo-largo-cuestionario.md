# Modelo largo de prompt · cuestionario GIFT sobre el mito de la caverna

Actúa como docente de Filosofía con experiencia en evaluación. Diseña un cuestionario de opción múltiple sobre **el mito de la caverna de Platón** para alumnado de **[curso]**. Usa un estilo claro y descriptivo, adecuado al nivel. El propósito es comprobar comprensión de las ideas del texto, no premiar la memorización de detalles irrelevantes.

## Diseño del cuestionario

- Redacta exactamente **10 preguntas diferentes**.
- Cada pregunta debe evaluar una idea o relación filosófica concreta del mito: prisioneros, sombras, objetos y fuego, liberación, salida al exterior, sol, conocimiento y regreso a la caverna.
- Formula enunciados breves, claros y completos. Cada pregunta tendrá un máximo de 10 palabras e irá entre signos de interrogación.
- Añade cuatro opciones por pregunta: una correcta y tres distractores plausibles, inequívocos y distintos entre sí. Cada opción tendrá un máximo de 10 palabras. Evita distractores absurdos o que dependan de una trampa lingüística.
- Coloca primero la respuesta correcta en el archivo. No añadas letras ni numeración delante de las opciones: GIFT determina su orden y sintaxis.
- Incluye retroalimentación breve para la opción correcta y para cada distractor. Explica el concepto que conviene revisar sin ridiculizar al estudiante.
- No repitas en la pregunta el mismo término distintivo que revela la respuesta. Evita que una pregunta dé la respuesta a otra.

## Introducción y categoría

Al inicio, añade una sola categoría con esta línea GIFT y adapta el nombre si hace falta:

`$CATEGORY: $course$/El mito de la caverna de Platón`

Añade una única descripción inicial de al menos 30 palabras. Debe orientar sobre el propósito del cuestionario sin usar literalmente la respuesta correcta de la primera pregunta ni formular otra pregunta. Escríbela como una descripción GIFT válida, no como una pregunta puntuable.

## Sintaxis de salida

Devuelve únicamente texto plano GIFT válido para Moodle, codificable en UTF-8. No incluyas introducciones, comentarios fuera del archivo, viñetas Markdown ni bloques de código. Deja una línea vacía entre elementos. Usa un título breve entre `::` para cada pregunta y esta estructura de opción múltiple:

`::01 - Título::¿Pregunta? {=Respuesta correcta#Retroalimentación correcta ~Distractor 1#Retroalimentación ~Distractor 2#Retroalimentación ~Distractor 3#Retroalimentación}`

Usa `=` para la respuesta correcta, `~` para cada distractor y `#` para su retroalimentación. Escapa con una barra invertida los símbolos reservados de GIFT (`~`, `=`, `#`, `{`, `}`, `:`) cuando aparezcan como texto literal. Conserva tildes y eñes; no traduzcas ni alteres la sintaxis propia del formato.

## Revisión antes de entregar

Comprueba que hay una sola línea de categoría, una descripción, exactamente 10 preguntas y cuatro opciones por pregunta; que cada pregunta tiene una sola respuesta correcta y todas las respuestas incluyen retroalimentación; que los límites de palabras se cumplen; y que el archivo no contiene texto ajeno al GIFT. Si alguna instrucción entra en conflicto con una sintaxis válida, prioriza la sintaxis de Moodle y explica la incidencia fuera del archivo solo si te lo pido.
