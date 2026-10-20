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
- **Excepción:** la barra de navegación (sección 9.1) usa esquinas cuadradas (radio 0) en todos sus elementos, como en `mock-ups/Hero-01/nav-01.html`.

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
- **Selector de tema:** botón cuadrado de 40 px con icono sol / luna (trazo 1.6 px) que gira 90° al pasar el cursor. Su borde pasa a `--color-secondary` en hover.
- **Selector de idioma:** control segmentado `EN | ES` de esquinas cuadradas, con borde de 1 px; el idioma activo se invierte (fondo `--color-text`, texto `--color-bg`).
- **Barra de navegación:** ver sección 9.1.

#### 9.1 Barra de navegación

Referencia de diseño: `mock-ups/Hero-01/nav-01.html` (idea «Glitch Nav»). Implementación en `src/components/layout/navbar.tsx`.

**Barra (escritorio, desde 900 px)**

- Fija arriba (`sticky`), a todo el ancho, con borde inferior de 1 px en `--color-border` y fondo `--color-bg`. Su alto es la variable `--header-h` (84 px; 60 px en pantallas bajas como un celular en horizontal), de la que dependen el desplazamiento de las anclas, el alto del hero y la posición del menú móvil.
- Esquinas cuadradas en todos sus elementos.
- Izquierda: solo el nombre «Gabriel Peñaranda» en Anta, con tamaño fluido (de 14 px en pantallas de 320 px a 18 px desde unos 400 px), `letter-spacing: 0.02em` y efecto glitch en hover. Sin logo. Mide 44 px de alto para que sea fácil de tocar.
- Centro: enlaces *Work, About, Experience, Contact* (*Proyectos, Sobre mí, Experiencia, Contacto* en español) con separación de 32 px y 44 px de alto cada uno. A 900 px el menú en español todavía cabe en una línea; por debajo se usa la hamburguesa.
- Derecha: selector de idioma y selector de tema, con 10 px de separación.

**Sección activa**

- Se marca al hacer clic y, cuando existen las secciones, también al hacer scroll (`IntersectionObserver`, hook `useActiveSection`).
- El enlace activo pasa a `--color-secondary` y muestra un cuadrito rojo de 7 px que gira al aparecer (350 ms, curva con rebote).
- Los destinos son `#work`, `#about`, `#exp` y `#contact`; el logo lleva a `#top`. Con la barra fija, `html` usa `scroll-padding-top: 81px`.

**Efecto glitch**

- Dos capas fantasma (roja `--color-secondary` y azul `--color-primary`) más un temblor breve, solo en hover o foco de teclado sobre enlaces y logo.
- Con `prefers-reduced-motion: reduce` las capas fantasma se desactivan.
- Componente `GlitchText` y clases `.glitch` / `.glitch-host` en `globals.css`.

**Móvil y tableta (menos de 900 px)**

- Se ocultan los enlaces y el selector de tema de la barra (que pasa al panel); aparece el botón hamburguesa de 44 px, que se transforma en una X al abrirse. Padding lateral de 16 px (32 px desde 640 px).
- El botón abre un panel que cubre la pantalla bajo la barra. Se cierra con `Esc`, al tocar un enlace, al pulsar el logo o al ensanchar la ventana. Mientras está abierto, la página no se desplaza.
- Contenido del panel: línea `> signal acquired_` con cursor parpadeante, los cuatro enlaces en Anta 34 px con su código `0x01`–`0x04`, y abajo el selector de tema junto a `gabriel_penaranda`.
- El panel se enciende con una animación tipo CRT (750 ms) y lleva líneas de escaneo sutiles encima.

| Token | Modo claro | Modo oscuro | Uso |
|---|---|---|---|
| `--nav-panel` | `#FAFAF7` | `#000000` | Fondo del panel móvil |
| `--nav-panel-text` | `#0A0B10` | `#F2F2EE` | Texto del panel |
| `--nav-panel-muted` | `#4A4E5C` | `#9AA0B2` | Texto secundario del panel |
| `--nav-scan` | `rgba(10,11,16,.05)` | `rgba(255,255,255,.045)` | Líneas de escaneo |

En modo claro el panel usa el mismo fondo que la página (`--color-bg`), sin capa gris. El mock-up original lo dibujaba en gris `#D9D9D4`.

**Accesibilidad:** el botón hamburguesa lleva `aria-expanded`, `aria-controls` y una etiqueta que cambia entre abrir y cerrar; el enlace activo lleva `aria-current="page"`; la barra y el panel son `nav` con etiquetas distintas (*Main* y *Main mobile*).

#### 9.2 Hero y foto de perfil

Referencia de diseño: `mock-ups/Hero-01/Main.dc.html` (composición) y la idea 03 «Ecualizador» de `mock-ups/Hero-01/Signal Ring Hero.html` (foto). Implementación en `src/components/sections/hero.tsx` y `equalizer-avatar.tsx`.

- Composición: dos columnas en escritorio (7 + 5 de 12); por debajo de 900 px pasa a una columna con la foto arriba, y también en pantallas bajas (celular en horizontal) mantiene dos columnas.
- Columna de texto: `01 /` con insignia «Implementing AI into the software life cycle», línea `> whoami → Gabriel Augusto Peñaranda Caldas`, titular que se escribe letra por letra, introducción, botón principal y secundario (con efecto magnético) y una fila con la ciudad y los tres rasgos profesionales. Textos EN / ES en `src/content/hero.ts`.
- Titular: «¡Hola! Soy Gabo. Y creo software que se siente humano.» / «Hi! I'm Gabo. And I build software that feels human.»
- Perfil: Cloud & AI Software Engineer en Lima, Perú. Rasgos mostrados: pragmático, entusiasta por aprender y honrado.
- Fondo del hero: ocupa todo el ancho de la pantalla y la altura visible bajo la barra (`100svh − var(--header-h)`), con el contenido centrado en vertical. Es una retícula tipo plano técnico que se desvanece hacia los bordes y líneas de escaneo sutiles.

**Foto de perfil: «Ecualizador»**

- Foto circular grande, con tamaño fluido: de unos 120 px en celulares pequeños a 240 px en tableta (`clamp(7.5rem, 32vw, 15rem)`), 280 px desde 900 px y 144 px en pantallas bajas, con un aro de 4 px rojo, azul y amarillo que gira cada 7 s. Las barras y el área de la escena escalan con el tamaño de la foto.
- 56 barras de 4 px alrededor de la foto, de largo proporcional a su tamaño (20 %), que laten con el tiempo. Su color recorre rojo, azul y amarillo al mismo ritmo que el aro.
- El movimiento horizontal del cursor o del dedo da «energía» a las barras, que crecen y luego se calman.
- La escena se inclina hasta 8° hacia el cursor.
- Cada 3.5 a 6.5 s, y al tocar la foto, una interferencia breve (650 ms) distorsiona la imagen con una banda de luz que la recorre.
- Con `prefers-reduced-motion: reduce` el aro no gira, las barras quedan quietas, no hay inclinación ni interferencia.
- La foto lleva texto alternativo en el idioma activo y se carga con prioridad (`priority`).

#### 9.3 Sección Work

Referencia de diseño: `mock-ups/Projects-02/Work Dashboard.html`. Implementación en `src/components/sections/work/`. Los datos llegan del API simulado (ver «Work: API simulado» en Software Architecture).

- **Cabecera:** línea `> cd ./work/projects`, `./work/experience` o `./work/certificates` según la pestaña (en español, `./trabajo/proyectos`, `./trabajo/experiencia` y `./trabajo/certificados`) y título `02 / Work` (`02 / Proyectos` en español).
- **Panel:** caja con borde y brillo suave, esquinas cuadradas, con tres pestañas y debajo el riel de filtros y los resultados.
  - **Alto fijo:** 640 px desde 900 px y 600 px por debajo (definidos en `rem`), sin cambiar entre pestañas ni según el número de resultados. Cuando no caben, los resultados se desplazan dentro del panel, y los filtros también si hace falta. La línea de consulta y las píldoras de filtros se quedan fijas arriba. Al cambiar de pestaña o de filtro, los resultados vuelven al inicio.
  - **Tamaño en pantallas grandes:** a partir de 2200 px de ancho el dashboard se escala ×1.25 (alto de 800 px, ancho hasta 2100 px) y a partir de 3000 px ×1.5 (alto de 960 px, ancho hasta 2520 px). Todo crece en proporción (texto, tarjetas, bordes y filtros) con la propiedad CSS `zoom`, así que el diseño es idéntico al de 1080p pero más grande. Por debajo de 2200 px no cambia.
  - **Botones − y +:** junto al título, ajustan el tamaño de todo el dashboard en 8 pasos (80 %, 90 %, 100 %, 110 %, 125 %, 150 %, 175 % y 200 %), combinados con el escalado automático. El botón del medio muestra el porcentaje y lo restablece al 100 %. La elección se recuerda entre visitas y los botones se ocultan por debajo de 900 px, donde el tamaño siempre es el normal.
  - **Ancho:** la sección usa hasta 1680 px de ancho (el hero queda en 1200 px), de modo que las tarjetas de proyectos y certificados se reparten en 4 columnas en una pantalla de 1440 px y en 5 en una de 1920 px, con tarjetas de 240 px como mínimo.
- **Pestañas:** Projects `0x01`, Experience `0x02` y Certificates `0x03`, cada una con el número de resultados actual. La pestaña activa va en rojo con un rombo, y una línea azul se desliza bajo ella. Se navega con las flechas del teclado.
- **Filtros** (columna izquierda, 260 px):
  - Proyectos: lenguaje de programación e infraestructura cloud.
  - Experiencia: tag y año.
  - Certificados: categoría.
  - Las opciones se obtienen de los propios datos y cada una muestra cuántos resultados daría; las que darían 0 se atenúan.
  - Mismo grupo = cualquiera, grupos distintos = todos. Botón «Limpiar» y píldoras de filtros activos que se quitan con un clic. Los tags que coinciden con un filtro se resaltan en las tarjetas.
- **Línea de consulta:** `> query projects 3 / 8_` con cursor parpadeante.
- **Resultados:**
  - Proyectos: tarjetas con miniatura (la imagen del proyecto o una miniatura geométrica generada a partir de su `id`), año, resumen, etiquetas y enlaces a demo y repositorio. Suben 3 px al pasar el cursor.
  - Experiencia: línea de tiempo vertical con rombos rojos y el periodo (`2025 — now`).
  - Certificados: tarjetas con sello circular, emisor, año y estado (obtenido o en curso).
  - Los elementos con `"sample": true` muestran una insignia amarilla `SAMPLE` / `EJEMPLO`.
  - Estados de carga, de error (con botón «Try again») y vacío (con botón para limpiar filtros).
- **Menos de 900 px:** el riel de filtros se convierte en un panel inferior con fondo oscurecido. Se abre con el botón «Filters» (con contador), se cierra con `Esc`, con la X, tocando el fondo o con «Show N results», y mientras está abierto la página no se desplaza. Las pestañas se apilan en vertical.
- **Enlace «Experience» del nav:** abre la pestaña Experience dentro de Work y desplaza la página hasta la sección. Al llegar, el nav resalta «Work», porque Experience no es una sección aparte.
- **Con `prefers-reduced-motion`:** el desplazamiento no es suave y las tarjetas aparecen sin animación.

### 10. Iconografía e imágenes

- Iconos de línea, trazo de 1.5 px, esquinas redondeadas (por ejemplo Lucide o Phosphor).
- Foto de perfil: `public/images/gabriel-perfil.webp` (994 × 994 px, cuadrada para recortarla en círculo). Fotografías de proyectos: pendientes de entrega.
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

---

## Software Architecture

### Code Architecture

Estructura de carpetas del proyecto, ordenada de mayor a menor jerarquía. Cada carpeta tiene una sola responsabilidad para que el desarrollador (y la IA) sepa dónde va cada cosa.

```
.
├── mock-ups/
│   ├── Hero-01/
│   └── Projects-02/
├── public/
│   └── images/
├── scripts/
│   └── generate-images.mjs
└── src/
    ├── app/
    │   ├── api/[locale]/        projects.json, experience.json, certificates.json
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   ├── button-link.tsx
    │   │   ├── glitch-text.tsx
    │   │   ├── language-switcher.tsx
    │   │   └── theme-toggle.tsx
    │   ├── layout/
    │   │   ├── locale-provider.tsx
    │   │   ├── navbar.tsx
    │   │   └── theme-provider.tsx
    │   └── sections/
    │       ├── equalizer-avatar.tsx
    │       ├── hero.tsx
    │       └── work/
    │           ├── certificate-card.tsx
    │           ├── experience-row.tsx
    │           ├── filter-model.ts
    │           ├── filter-rail.tsx
    │           ├── project-card.tsx
    │           ├── project-thumb.tsx
    │           ├── sample-badge.tsx
    │           ├── size-controls.tsx
    │           ├── tag.tsx
    │           ├── work-tabs.tsx
    │           └── work.tsx
    ├── content/
    │   ├── hero.ts
    │   ├── nav.ts
    │   └── work.ts
    ├── domain/
    │   └── work/
    │       ├── certificate.ts
    │       ├── experience.ts
    │       ├── filters.ts
    │       ├── period.ts
    │       ├── project.ts
    │       └── sorting.ts
    ├── hooks/
    │   ├── use-active-section.ts
    │   ├── use-magnetic.ts
    │   ├── use-prefers-reduced-motion.ts
    │   ├── use-typewriter.ts
    │   ├── use-work-collection.ts
    │   └── use-work-zoom.ts
    ├── lib/
    │   ├── base-path.ts
    │   ├── breakpoints.ts
    │   ├── image-loader.ts
    │   └── locale.ts
    └── server/
        └── work/
            ├── data/            projects.json, experience.json, certificates.json
            ├── index.ts
            ├── json-repository.ts
            ├── mappers.ts
            ├── repository.ts
            └── schemas.ts
```

#### Nivel 1: raíz del proyecto

| Carpeta | Por qué existe |
|---|---|
| `mock-ups/` | Reúne los diseños de prototipo de la aplicación. Es la referencia visual que guía al desarrollador y a la IA: ahí se consultan los valores exactos de color, tamaño, espaciado y distribución. No es código de la aplicación, por eso queda fuera del build y de ESLint. |
| `public/` | Archivos estáticos que Next.js sirve tal cual desde la raíz del sitio (`/images/foto.webp`). Aquí va todo lo que no necesita procesarse: imágenes, favicon, documentos descargables como el CV en PDF. |
| `src/` | Todo el código de la aplicación. Separarlo de la raíz deja ahí solo la configuración (`package.json`, `tsconfig.json`, `next.config.ts`, etc.) y evita mezclar ambas cosas. |

#### Nivel 2: dentro de `mock-ups/`, `public/` y `src/`

| Carpeta | Por qué existe |
|---|---|
| `mock-ups/Hero-01/` y `mock-ups/Projects-02/` | Un mock-up por carpeta, con nombre `<Pantalla>-<número>`. `Projects-02` contiene `Work Dashboard.html`, el diseño de la sección Work. `Hero-01` agrupa los diseños de la portada: `Main.dc.html` (composición general), `nav-01.html` (barra de navegación) y `Signal Ring Hero.html` (seis ideas para la foto de perfil). Incluye su propio `README.md` con instrucciones para verlos. Al añadir más pantallas se crean carpetas hermanas (`About-02`, `Projects-03`...). |
| `public/images/` | Fotografías, logo, monograma e imágenes de proyectos. Formato WebP o AVIF con texto alternativo, según la guía de estilo (sección 10). |
| `src/domain/` | El lenguaje del negocio, sin dependencias de React ni de Next.js: entidades (`Project`, `Experience`, `Certificate`), objetos de valor (`Period`) y reglas puras (filtrado y orden). Lo usan tanto el servidor como la interfaz, por eso no vive dentro de `server/`. Hoy: `work/`. |
| `src/server/` | El API simulado. Lee y valida los JSON, los convierte en entidades de `domain/` según el idioma y los entrega a los endpoints. Hoy: `work/`. Ver «Work: API simulado». |
| `src/app/` | Enrutador de Next.js (App Router). Cada carpeta con un `page.tsx` es una ruta. Aquí viven también el `layout.tsx` raíz (fuentes, proveedor de tema, `lang`), los estilos globales (`globals.css` con los tokens de la sección 3) y el favicon. Contiene solo la composición de páginas, no la lógica de interfaz. Hoy: `layout.tsx` monta los proveedores de tema e idioma y la barra de navegación, y `api/[locale]/` expone el API simulado de Work. |
| `src/components/` | Todos los componentes de React reutilizables. Se divide en tres subcarpetas según su alcance (ver nivel 3). |
| `src/content/` | Los textos del sitio y los datos de los proyectos, separados del diseño. Facilita el selector EN / ES (sección 11): cada idioma tiene su entrada y cambiar un texto no obliga a tocar componentes. Hoy: `nav.ts`, `hero.ts` y `work.ts` con los textos EN / ES de la interfaz. |
| `src/hooks/` | Hooks personalizados de React (por ejemplo, seguir el cursor para las tarjetas inclinadas y los botones magnéticos, o detectar `prefers-reduced-motion`). Evitan repetir lógica entre componentes. Hoy: `use-active-section` (qué sección cruza la mitad de la pantalla, para marcarla en la barra), `use-typewriter` (titular que se escribe), `use-magnetic` (botones magnéticos), `use-prefers-reduced-motion` y `use-work-collection` (carga cada colección del API simulado en el idioma activo) y `use-work-zoom` (tamaño del dashboard elegido por el usuario). |
| `src/lib/` | Funciones de apoyo y constantes que no son componentes ni hooks: utilidades para combinar clases CSS, formateo de fechas, configuración del sitio. Son funciones puras fáciles de probar. Hoy: `locale.ts` con los idiomas disponibles (`en`, `es`), el idioma por defecto y la clave de almacenamiento, y `base-path.ts`, que añade el prefijo `/00-MyOwnCv` a las rutas en GitHub Pages. |

#### Nivel 3: dentro de `src/components/`

| Carpeta | Por qué existe |
|---|---|
| `ui/` | Piezas pequeñas y genéricas que no conocen el contenido del portafolio: botón principal y secundario, enlace, insignia, tarjeta, selector de tema, selector de idioma (sección 9). Se pueden usar en cualquier parte. Hoy: `ButtonLink`, `GlitchText`, `LanguageSwitcher` y `ThemeToggle`. |
| `layout/` | Estructura que se repite en todas las páginas: barra de navegación, pie de página y los proveedores de tema e idioma. Define el marco dentro del cual se muestra cada página. Hoy: `Navbar` (sección 9.1), `ThemeProvider` (`next-themes`, atributo `data-theme`) y `LocaleProvider`, que guarda el idioma elegido en `localStorage` y actualiza el atributo `lang` de la página. |
| `sections/` | Bloques grandes de una página, uno por idea principal: hero, proyectos, experiencia, contacto. Combinan componentes de `ui/` con textos de `content/`. Hoy: `Hero`, `EqualizerAvatar` y `work/` (la sección Work, ver 9.3). Cada sección corresponde a una numerada (`01 /`, `02 /`) en el diseño. |

#### Work: API simulado

La sección Work (proyectos, experiencia y certificados) se alimenta de un API simulado. Se aplica un DDD ligero: sin agregados ni eventos, pero con lenguaje común, un puerto de datos y reglas de dominio puras.

**Flujo de datos**

```
src/server/work/data/*.json          lo que tú subes (textos en EN y ES)
        │  validación con zod (schemas.ts)
        ▼
json-repository.ts → mappers.ts      elige el idioma y crea entidades de domain/
        │  orden (domain/work/sorting.ts)
        ▼
src/app/api/[locale]/*.json/route.ts  endpoints, generados como archivos en el build
        │  fetch
        ▼
interfaz                              filtra con domain/work/filters.ts
```

**Endpoints** (un archivo por idioma y colección):

| Endpoint | Contenido |
|---|---|
| `/api/en/projects.json`, `/api/es/projects.json` | Proyectos, destacados primero y luego año descendente |
| `/api/en/experience.json`, `/api/es/experience.json` | Experiencia, puesto actual primero y luego inicio descendente |
| `/api/en/certificates.json`, `/api/es/certificates.json` | Certificados, «en curso» primero y luego fecha descendente |

Cada respuesta es un arreglo de objetos con los textos ya en el idioma pedido. En el navegador, usa `withBasePath()` de `src/lib/base-path.ts` para construir la URL del `fetch`.

**Cómo subir tu información.** Edita los tres JSON de `src/server/work/data/`. Los textos traducibles se escriben una sola vez con los dos idiomas: `"summary": { "en": "...", "es": "..." }`. Los nombres, años, etiquetas y enlaces son iguales en ambos idiomas. Los datos de ejemplo llevan `"sample": true`; cámbialo a `false` (o quítalo) al poner datos reales.

| Colección | Campos |
|---|---|
| `projects.json` | `id`, `name`, `year`, `summary` {en, es}, `languages[]`, `cloud[]`, `links` {`demo?`, `repository?`}, `image?` {`src`, `alt` {en, es}}, `featured`, `sample` |
| `experience.json` | `id`, `role` {en, es}, `organization`, `from` (`"YYYY-MM"`), `to` (`"YYYY-MM"` o `null` si sigue vigente), `description` {en, es}, `tags[]`, `sample` |
| `certificates.json` | `id`, `name`, `issuer`, `category` (`aws`, `gcp`, `language` o `ux`), `date` (`"YYYY-MM"`, emisión o fecha prevista), `status` (`earned` o `in-progress`), `expires?` (`"YYYY-MM"`), `credentialId?`, `credentialUrl?`, `badge` (hasta 5 letras), `image?` {`src`, `alt` {en, es}}, `sample` |

El `id` es un identificador en minúsculas con guiones (`cost-radar`) y no puede repetirse dentro de un archivo.

**Validación.** Si un JSON tiene un error (falta un idioma, una fecha mal escrita, un `id` repetido), el build falla y muestra el archivo y el campo exactos.

**Reglas de dominio** (`src/domain/work/filters.ts`): dentro de un mismo grupo basta con que coincida un valor; entre grupos distintos deben cumplirse todos. Las opciones de cada filtro se obtienen de los propios datos y cada una muestra cuántos resultados daría.

**Cambiar la fuente de datos.** `WorkRepository` es la interfaz que usan los endpoints. Para pasar a una base de datos real basta con otra implementación de esa interfaz, sin tocar los componentes.

#### Responsive

El diseño es *mobile first*: los estilos base son los del celular y se amplían con `desk:` (desde 900 px) y `sm:` (desde 640 px). Solo hay dos puntos de corte, definidos por contenido y no por dispositivo, en `globals.css` y `src/lib/breakpoints.ts`:

| Punto de corte | Ancho | Qué cambia |
|---|---|---|
| (base) | menos de 640 px | Celular: una columna, hamburguesa, filtros en panel inferior. |
| `sm` | 640 px | Más aire: márgenes laterales de 32 px, textos más grandes en el hero. |
| `desk` | 900 px | Escritorio: enlaces en línea, hero a dos columnas, filtros en columna lateral. Es el ancho mínimo donde el menú en español cabe en una línea. |

Además hay dos variantes por condición, no por ancho: `short` (pantallas de menos de 520 px de alto, como un celular en horizontal: barra más baja, hero a dos columnas, foto más pequeña) y `coarse` (pantallas táctiles).

- **Unidades:** los textos y los tamaños estructurales están en `rem`, para respetar el tamaño de letra configurado en el navegador; el titular y el nombre usan `clamp()`. Los puntos de corte también están en `rem`.
- **Zonas táctiles:** todo lo que se pulsa mide al menos 44 px de alto en celular y en pantallas táctiles (enlaces, selector de idioma y de tema, filtros, pestañas, botones). Con ratón, en escritorio, algunos (filtros, píldoras, enlaces de tarjetas) son más compactos.
- **Sin depender del hover:** el glitch, el efecto magnético y el levantado de tarjetas son decorativos; nada esencial requiere pasar el cursor.
- **Rendimiento:** el ecualizador y la interferencia de la foto solo se animan mientras la foto está a la vista, y se desactivan con `prefers-reduced-motion`.

#### Despliegue en GitHub Pages

El sitio se publica como exportación estática (`output: 'export'` en `next.config.ts`): `npm run build` genera la carpeta `out/` con HTML, CSS, JS y los JSON del API.

- **Ruta base:** en producción todo cuelga de `/00-MyOwnCv`; en desarrollo se sirve desde la raíz.
- **Imágenes de Work:** los logos se muestran cuadrados y sin borde visible. viven en `public/images/work/{projects,experience,certificates}/`. Cada elemento de los JSON puede traer `image: { src, alt: { en, es } }`; `src` es una ruta bajo `public/` sin el prefijo `/00-MyOwnCv`, y el build falla si el archivo no existe. Sin `image`, los proyectos muestran la miniatura generada y los certificados el sello con `badge`.
- **Imágenes:** GitHub Pages no puede redimensionar imágenes al vuelo, así que `next/image` usa un cargador propio (`src/lib/image-loader.ts`) que elige entre copias ya generadas. La foto de perfil tiene copias de 320 y 640 px, creadas con `npm run images` (`scripts/generate-images.mjs`, usa `sharp`); el navegador descarga la más pequeña que le sirve (18 KB en un celular, en lugar de los 80 KB del original). Para otra imagen que necesite copias, añádela a las dos listas (el script y el cargador). El prefijo `/00-MyOwnCv` lo añade el cargador.
- **Idioma en la ruta:** al ser archivos estáticos, el API no puede leer `?locale=`; por eso el idioma va en la URL.
- **Cambiar un JSON** implica volver a construir y publicar el sitio.
- **Cache Components:** `cacheComponents` y `partialPrefetching` están desactivados porque no son compatibles con la exportación estática.
- **Vista previa:** `npm run dev` para desarrollar. `npm run start` ya no sirve con una exportación estática.

#### Regla de dependencias

El flujo va de lo general a lo específico: `app/` usa `layout/`, `sections/` y `server/`; `server/` solo usa `domain/` y `lib/`; `domain/` no usa nada de la aplicación; `layout/` y `sections/` usan `ui/`, `hooks/`, `lib/` y `content/`; `ui/` usa `hooks/`, `lib/` y `content/`, y puede leer el idioma y el tema a través de `useLocale()` y `useTheme()`. Una carpeta nunca importa de otra que esté por encima en este flujo, y `ui/` nunca importa de `sections/`. Esto evita dependencias circulares y mantiene los componentes pequeños reutilizables.
