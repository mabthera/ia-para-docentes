# Diccionario de Seudocomandos y Recetas para Docentes

> **Instrucciones para el Proyecto:**  
> Copia este archivo dentro de los archivos de conocimiento de tu Proyecto en **ChatGPT** o **Claude**, o pega su contenido en las *Instrucciones del Proyecto*.  
> Cuando una petición comience con una barra inclinada (`/`), la IA buscará la receta correspondiente y aplicará su procedimiento sin que tengas que volver a escribirlo. Puedes combinar varios comandos en la misma petición (por ejemplo: `/ficha /multinivel /solucionario`).

---

## 1. Comandos para crear explicaciones y textos

### `/didactico`
* **Objetivo:** Transformar un contenido técnico, un tema del libro o un concepto abstracto en una explicación clara y pedagógica adaptada al nivel del alumnado.
* **Procedimiento que aplicará la IA:**
  1. Identificar el nivel educativo destinatario.
  2. Activar conocimientos previos con una pregunta o situación cotidiana.
  3. Estructurar la explicación de lo sencillo a lo complejo, dividida en subtítulos cortos.
  4. Definir con claridad el vocabulario técnico esencial.
  5. Incorporar una analogía visual o cotidiana para ilustrar el concepto central.
  6. Advertir sobre los errores o confusiones más frecuentes que suelen cometer los estudiantes.
  7. Finalizar con 2 preguntas de autocomprobación de respuesta breve.

---

### `/adaptacion-dua`
* **Objetivo:** Adaptar un texto curricular bajo los principios del Diseño Universal para el Aprendizaje (DUA) y accesibilidad cognitiva (especialmente útil para alumnado con dislexia o dificultades de comprensión).
* **Procedimiento que aplicará la IA:**
  1. Simplificar la sintaxis priorizando estructuras directas (sujeto + verbo + predicado) y oraciones cortas (máximo 15-20 palabras).
  2. Fragmentar en párrafos de no más de 3 o 4 líneas.
  3. Resaltar en **negrita** los términos clave para facilitar el barrido visual.
  4. Acompañar términos difíciles de una explicación inmediata entre paréntesis o en glosario lateral.
  5. Transformar secuencias o enumeraciones en listas con viñetas limpias (`•`).
  6. Cerrar con un mapa conceptual en texto (esquema indentado con guiones) que resuma las ideas clave.

---

## 2. Comandos para diseñar actividades y materiales

### `/ficha`
* **Objetivo:** Diseñar una ficha de trabajo imprimible o editable para el aula.
* **Procedimiento que aplicará la IA:**
  1. Encabezado limpio: Título, Materia, Curso, Nombre del alumno/a y Fecha.
  2. Breve introducción motivadora o contexto de la tarea (máximo 4 líneas).
  3. Batería de 4 a 6 actividades variadas y progresivas según la Taxonomía de Bloom (comprensión, aplicación y reflexión).
  4. Pautas claras de entrega y tiempo estimado de resolución.
  5. Espacio visualmente reservado para la respuesta del alumnado.

---

### `/multinivel`
* **Objetivo:** Diferenciar cualquier actividad, texto o ficha en tres niveles pedagógicos simultáneos manteniendo el mismo objetivo de aprendizaje.
* **Procedimiento que aplicará la IA:**
  1. **Nivel Apoyo (Andamiaje):** Textos con lectura facilitada, pistas explícitas, preguntas guiadas y opciones sugeridas.
  2. **Nivel Estándar:** Actividades alineadas con el nivel medio curricular del curso.
  3. **Nivel Ampliación (Enriquecimiento):** Preguntas de investigación abierta, transferencia a situaciones reales, pensamiento crítico o conexión interdisciplinar.

---

### `/solucionario`
* **Objetivo:** Incorporar las respuestas correctas de todas las actividades propuestas.
* **Procedimiento que aplicará la IA:**
  1. Presentar la solución a cada actividad de forma clara y diferenciada.
  2. Incluir una breve justificación razonada de por qué esa es la respuesta correcta y qué fallo común suele producirse.
  3. En problemas numéricos o ejercicios procedimentales, desglosar el paso a paso del cálculo.
  4. Indicar criterios de puntuación orientativos por pregunta (ej. total sobre 10 puntos).

---

## 3. Comandos de evaluación y gamificación

### `/rubrica`
* **Objetivo:** Diseñar una rúbrica analítica rigurosa para evaluar un producto, tarea o situación de aprendizaje.
* **Procedimiento que aplicará la IA:**
  1. Crear una tabla estructurada con criterios vinculados a las competencias de la materia.
  2. Definir cuatro niveles de desempeño observables:
     - *Nivel 1: Inicial / En proceso bajo (1-4)*
     - *Nivel 2: Suficiente / En proceso medio (5-6)*
     - *Nivel 3: Notable / Avanzado (7-8)*
     - *Nivel 4: Sobresaliente / Experto (9-10)*
  3. Redactar descriptores cualitativos centrados en evidencias observables, evitando términos subjetivos como "mucho", "bien" o "poco".
  4. Incluir columna de ponderación porcentual para cada criterio.

---

### `/kahoot`
* **Objetivo:** Generar una batería de preguntas lista para importar o volcar en Kahoot u otras herramientas de concurso.
* **Procedimiento que aplicará la IA:**
  1. Redactar entre 10 y 15 preguntas de opción múltiple directas y sin ambigüedad.
  2. Formato: Pregunta (máx. 120 caracteres) + 4 opciones de respuesta breves (máx. 75 caracteres).
  3. Señalar con un asterisco (`*`) o etiqueta clara la opción correcta.
  4. Indicar el tiempo recomendado por pregunta (20 s o 30 s).
  5. Organizar en tabla limpia para copiar y pegar fácilmente en plantillas de hoja de cálculo (`.csv` o Excel).

---

### `/pau`
* **Objetivo:** Formular preguntas de examen siguiendo la estructura y criterios de corrección de las pruebas de acceso a la universidad (PAU / EvAU).
* **Procedimiento que aplicará la IA:**
  1. Ajustarse a las tipologías habituales de la materia (definición de conceptos, análisis de fuentes/gráficos, desarrollo de temas, problemas prácticos).
  2. Redactar los enunciados con los verbos operativos oficiales (*compare, defina, analice, justifique*).
  3. Añadir la rúbrica de corrección específica indicando los puntos asignados a cada elemento de la respuesta.

---

## Cómo usar los comandos en tu día a día

Una vez cargado este archivo en tu Proyecto, escribe en el chat peticiones tan simples y potentes como estas:

```text
/didactico /multinivel
Materia: Geografía e Historia 2.º ESO
Tema: El feudalismo y la sociedad estamental
```

```text
/ficha /multinivel /solucionario
Materia: Matemáticas 1.º ESO
Tema: Operaciones con fracciones
```

```text
/rubrica
Materia: Lengua Castellana y Literatura 4.º ESO
Tarea: Exposición oral grupal sobre el teatro barroco
```

```text
/kahoot
Materia: Física y Química 3.º ESO
Tema: La tabla periódica y los enlaces químicos (10 preguntas)
```
