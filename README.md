# 00-MyOwnCv
This repository contains the documentation and code of my webApplicationCV

---

## Style Guidelines

Guía de estilo del diseño gráfico del sitio CV / portafolio. Todo componente, página o pieza visual nueva debe seguir estas reglas.

### 1. Propósito y público

- **Objetivo:** que el sitio funcione como carta de presentación ante empresas.
- **Público principal:** empresas de tecnología grandes y empresas creativas que resuelven problemas con tecnología.
- **Lo que debe sentir un reclutador:** innovador, humano, confiable.

| Atributo | Cómo se traduce en diseño |
|---|---|
| Innovador | Estética retrofuturista, interacciones sorprendentes, animaciones llamativas |
| Humano | Tono cercano en los textos, formas redondeadas, fotos reales, microinteracciones amables |
| Confiable | Retícula ordenada, buen contraste, jerarquía clara, rendimiento rápido, accesibilidad |

### 2. Estilo visual

**Retrofuturista minimalista e interactivo.**

- Base minimalista: mucho espacio negativo, pocos elementos por pantalla, una idea principal por sección.
- Toques retrofuturistas: líneas de retícula tipo plano técnico, formas geométricas (círculos, órbitas, arcos), brillo suave tipo pantalla CRT, numeración de secciones estilo panel de control (`01 / 02 / 03`).
- Interactivo: los elementos responden al cursor, al scroll y al teclado. El visitante debe sentir que explora, no que solo lee.
- Regla de oro: los efectos retro son acentos, nunca ruido. Si un efecto compite con el contenido, se elimina.

### 3. Color

Colores de marca en orden de prioridad: **azul, rojo, amarillo**. Blanco y negro para todo lo general (fondos, texto, bordes).

- **Fondos principales:** siempre blanco (modo claro) o negro (modo oscuro).
- **Azul, rojo y amarillo:** se usan sobre todo en animaciones, logos y elementos gráficos o interactivos (botones, bordes, insignias, brillos). En texto se usan solo de forma puntual (enlaces, palabras destacadas, números de sección).

#### 3.1 Paleta base

| Token | Modo claro | Modo oscuro | Uso |
|---|---|---|---|
| `--color-bg` | `#FAFAF7` | `#0A0B10` | Fondo de página |
| `--color-surface` | `#FFFFFF` | `#14161F` | Tarjetas, paneles |
| `--color-text` | `#0A0B10` | `#F2F2EE` | Texto principal |
| `--color-text-muted` | `#5B6070` | `#A0A6B5` | Texto secundario, metadatos |
| `--color-border` | `#E3E3DE` | `#262A36` | Bordes, divisores, retícula |
| `--color-primary` | `#2347E6` | `#5B8CFF` | Azul. Enlaces, botones principales, foco |
| `--color-secondary` | `#C1121F` | `#FF5A6E` | Rojo. Acentos, estados activos, detalles |
| `--color-accent` | `#FFC300` | `#FFD23F` | Amarillo. Resaltados, insignias, brillos |
| `--color-on-accent` | `#0A0B10` | `#0A0B10` | Texto sobre amarillo |

#### 3.2 Proporción de uso

- 70 % neutros (blanco, negro y sus variantes)
- 20 % azul
- 7 % rojo
- 3 % amarillo

#### 3.3 Reglas de contraste (WCAG AA)

- Todo texto debe tener un contraste mínimo de 4.5:1 (3:1 para títulos grandes).
- Valores verificados sobre `--color-bg`: azul claro 6.4:1, rojo claro 5.9:1, azul oscuro 6.2:1, rojo oscuro 6.5:1, amarillo oscuro 13.6:1.
- **El amarillo nunca se usa como color de texto en modo claro** (contraste 1.5:1). En modo claro se usa solo como fondo, con texto `--color-on-accent` encima (12.2:1).
- El color nunca es el único indicador de un estado: se acompaña con icono, texto o subrayado.

#### 3.4 Degradados y brillos

- Degradado de marca: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`. Solo para elementos destacados (hero, botón principal, bordes animados).
- Brillo retro: `box-shadow: 0 0 24px color-mix(in srgb, var(--color-primary) 40%, transparent)`. En modo oscuro se intensifica; en modo claro se reduce a la mitad.

### 4. Tema claro y oscuro

- El sitio ofrece ambos modos con un selector visible en la barra de navegación.
- La primera visita respeta `prefers-color-scheme` del sistema; la elección del visitante se recuerda.
- Todos los colores se definen como variables CSS; ningún componente usa colores fijos.
- El cambio de tema tiene una transición de 300 ms en fondo y texto.

### 5. Tipografía

| Rol | Fuente | Autor | Uso |
|---|---|---|---|
| Títulos | **Anta** | Sergej Lebedev | Mensajes principales, encabezados, números de sección |
| Texto base | **Cantarell** | Dave Crossland | Párrafos, botones, navegación, formularios |
| Código | **IBM Plex Mono** | Mike Abbink, Bold Monday | Frases escritas en código, fragmentos técnicos, etiquetas tipo terminal |

Las tres están disponibles en Google Fonts. Se cargan con `font-display: swap`.

```css
--font-display: "Anta", system-ui, sans-serif;
--font-body: "Cantarell", system-ui, sans-serif;
--font-code: "IBM Plex Mono", ui-monospace, monospace;
```

#### 5.1 Escala tipográfica (base 16 px, ratio 1.25)

| Token | Tamaño | Fuente | Interlineado | Uso |
|---|---|---|---|---|
| `--text-display` | `clamp(2.5rem, 6vw, 4.5rem)` | Anta | 1.05 | Titular del hero |
| `--text-h1` | `2.441rem` | Anta | 1.1 | Título de página |
| `--text-h2` | `1.953rem` | Anta | 1.2 | Título de sección |
| `--text-h3` | `1.563rem` | Anta | 1.25 | Subtítulos, título de tarjeta |
| `--text-lg` | `1.25rem` | Cantarell | 1.6 | Introducciones |
| `--text-base` | `1rem` | Cantarell | 1.65 | Texto general |
| `--text-sm` | `0.875rem` | Cantarell | 1.5 | Metadatos, pies de foto |
| `--text-code` | `0.95rem` | IBM Plex Mono | 1.5 | Código y frases técnicas |

#### 5.2 Reglas

- Anta solo en títulos; nunca en párrafos largos.
- Títulos de sección con un ligero espaciado: `letter-spacing: 0.02em`.
- Ancho máximo de lectura: 68 caracteres (`max-width: 68ch`).
- Las frases en código pueden llevar un prefijo tipo terminal (`>` o `$`) en `--color-primary`.

### 6. Espaciado y retícula

- Unidad base: **8 px**.
- Escala: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px (`--space-1` a `--space-10`).
- Retícula de 12 columnas en escritorio, 8 en tableta y 4 en móvil. Margen lateral mínimo de 16 px en móvil.
- Ancho máximo del contenido: 1200 px.
- Separación entre secciones: 96 px en escritorio, 64 px en móvil.
- La retícula puede mostrarse como fondo decorativo (líneas de 1 px en `--color-border`) para reforzar el estilo de plano técnico.

### 7. Formas, bordes y sombras

- Radios: `--radius-sm: 6px` (insignias), `--radius-md: 12px` (botones, campos), `--radius-lg: 20px` (tarjetas), `--radius-full: 999px` (píldoras, avatares).
- Bordes de 1 px en `--color-border`; al pasar el cursor cambian a `--color-primary`.
- Sombras suaves en modo claro; en modo oscuro se reemplazan por el brillo retro (sección 3.4).

### 8. Movimiento y animaciones

Las animaciones son **llamativas**: forman parte de la personalidad del sitio.

| Token | Duración | Uso |
|---|---|---|
| `--motion-fast` | 150 ms | Hover, foco, cambios de color |
| `--motion-base` | 300 ms | Apertura de menús, cambio de tema |
| `--motion-slow` | 600 ms | Entradas de sección |
| `--motion-hero` | 1200 ms | Animación inicial del hero |

- Curva principal: `cubic-bezier(0.22, 1, 0.36, 1)` (salida suave).
- Curva con rebote para microinteracciones: `cubic-bezier(0.34, 1.56, 0.64, 1)`.

**Repertorio de efectos:**

- Hero: titular que aparece letra por letra con efecto de escritura de terminal y cursor parpadeante.
- Entradas al hacer scroll: deslizamiento y desvanecimiento escalonado de los elementos.
- Tarjetas de proyectos: inclinación 3D que sigue al cursor y borde con degradado animado.
- Botones magnéticos: se acercan levemente al cursor.
- Fondo: órbitas y formas geométricas con parallax lento.
- Detalles retro: líneas de escaneo sutiles y un parpadeo CRT breve al cambiar de tema.

**Reglas:**

- Animar solo `transform` y `opacity` para mantener 60 fps.
- Ninguna animación bloquea la lectura ni el uso del sitio.
- Con `prefers-reduced-motion: reduce` se desactivan parallax, inclinaciones, escritura y parpadeos; quedan solo transiciones de opacidad cortas.

### 9. Componentes base

- **Botón principal:** fondo `--color-primary`, texto blanco, `--radius-md`, efecto magnético y brillo al pasar el cursor.
- **Botón secundario:** fondo transparente, borde y texto `--color-primary`; al pasar el cursor se rellena.
- **Enlace:** `--color-primary` con subrayado animado de izquierda a derecha.
- **Tarjeta de proyecto:** `--color-surface`, `--radius-lg`, imagen arriba, título en Anta, descripción en Cantarell, insignias de tecnologías en IBM Plex Mono.
- **Insignia / etiqueta:** `--radius-full`, texto `--text-sm`; la insignia destacada usa fondo `--color-accent` con texto `--color-on-accent`.
- **Número de sección:** Anta, `--color-secondary`, formato `01 /`.
- **Selector de tema:** icono sol / luna con animación de rotación.
- **Selector de idioma:** píldora `EN | ES`; el idioma activo en `--color-primary`.

### 10. Iconografía e imágenes

- Iconos de línea, trazo de 1.5 px, esquinas redondeadas (por ejemplo Lucide o Phosphor).
- Logo, monograma y fotografías: pendientes de entrega.
- Las fotos deben ser reales y naturales para reforzar el atributo humano. Formato WebP o AVIF, con texto alternativo descriptivo.

### 11. Idioma y tono de voz

- Idioma por defecto: **inglés**, con selector para cambiar a **español**. La elección se recuerda.
- Tono: cercano, claro y seguro. Primera persona, frases cortas, verbos de acción.
- Evitar jerga innecesaria; presentar cada proyecto por el problema que resuelve y el resultado obtenido.

### 12. Accesibilidad

- Contraste WCAG AA en ambos temas (sección 3.3).
- Foco visible en todos los elementos interactivos: contorno de 2 px en `--color-primary` con 2 px de separación.
- Navegación completa con teclado.
- Respeto de `prefers-reduced-motion` y `prefers-color-scheme`.
- Atributo `lang` actualizado al cambiar de idioma.
