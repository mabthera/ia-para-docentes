# Preparar preguntas e importarlas en Kahoot

El flujo tiene dos etapas: **crear y revisar las preguntas** y después **colocarlas en una tabla normal**. Descarga la plantilla oficial desde la [guía de Kahoot para importar preguntas](https://support.kahoot.com/hc/es/articles/115002812547-C%C3%B3mo-importar-preguntas-de-una-hoja-de-c%C3%A1lculo-a-tu-kahoot). Ábrela en Excel, LibreOffice, Google Sheets o Numbers y conserva sus encabezados.

## 1. Genera y revisa las preguntas

Pide al chatbot un borrador a partir del material curricular. Puedes usar esta petición como punto de partida:

```text
Crea [número] preguntas de tipo Quiz para [curso, materia y tema] a partir únicamente del material que adjunto. El objetivo es comprobar [objetivo de aprendizaje]. Usa un nivel de dificultad [básico/progresivo/mixto], preguntas claras y distractores plausibles. Indica en cada pregunta cuál es la respuesta correcta y por qué. No inventes información. Devuelve primero el borrador para que pueda revisarlo; todavía no lo conviertas en una tabla.
```

Comprueba la precisión, el nivel, los distractores y la respuesta correcta. Edita el borrador hasta que el contenido esté aprobado. Después, usa el prompt de formato.

## 2. Coloca las preguntas en una tabla normal

Pega las preguntas ya revisadas al final de esta petición:

```text
Ya he redactado y revisado estas preguntas. Colócalas en una tabla normal que se muestre como tabla para copiarlas y pegarlas en la plantilla de Kahoot.

Devuelve únicamente una tabla normal en Markdown que se muestre como tabla (no TSV ni bloque de código), con una pregunta por fila y estos encabezados exactos, en este orden: Question, Answer 1, Answer 2, Answer 3, Answer 4, Time limit (sec), Correct answer(s). Incluye una sola fila de encabezados. No añadas texto antes ni después de la tabla.

La pregunta no puede superar los 120 caracteres y cada respuesta los 75. Conserva entre 2 y 4 opciones por pregunta; deja vacías las celdas de opciones que no se usen. En Time limit (sec), elige un valor permitido: 5, 10, 20, 30, 60 o 120 segundos. En Correct answer(s), escribe solo el número de la opción correcta (por ejemplo, 3); si hay varias correctas, sepáralas con comas (por ejemplo, 2,3). No cambies el contenido ni inventes datos; si detectas una ambigüedad, señálala antes de generar la tabla.

Preguntas revisadas:
[pega aquí las preguntas con sus respuestas y la opción correcta]
```

La tabla debe tener exactamente estas columnas: **Question**, **Answer 1**, **Answer 2**, **Answer 3**, **Answer 4**, **Time limit (sec)** y **Correct answer(s)**. La pregunta admite hasta **120 caracteres** y cada respuesta, **75**. Los tiempos admitidos son **5, 10, 20, 30, 60 o 120 segundos**. La columna de respuesta correcta lleva el número de la opción, no el texto.

## 3. Copia la tabla a la plantilla

Copia la tabla normal y pégala empezando en la primera celda de encabezado de la plantilla oficial. Como los encabezados son idénticos, la fila de títulos quedará igual y las preguntas aparecerán debajo. Comprueba que cada valor quedó en su columna, revisa los índices de respuesta y guarda la hoja como **.xlsx**.

## 4. Importa el archivo en Kahoot

En Kahoot, pulsa **Crear → Añadir → Importar → Importar hoja de cálculo**, selecciona el archivo `.xlsx` y sigue el informe de validación. Corrige las filas con errores en la hoja, vuelve a subirla si hace falta y revisa las preguntas en el creador.

La importación por hoja de cálculo admite preguntas estándar de tipo *Quiz*. Las funciones del creador y los tipos disponibles pueden depender del plan.