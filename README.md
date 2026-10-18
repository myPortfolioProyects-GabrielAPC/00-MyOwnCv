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

**Barra (escritorio, más de 760 px)**

- Fija arriba (`sticky`), a todo el ancho, con borde inferior de 1 px en `--color-border`, fondo `--color-bg` y padding de 20 px 32 px (81 px de alto en total).
- Esquinas cuadradas en todos sus elementos.
- Izquierda: monograma GP de 40 px y el nombre «Gabriel Peñaranda» en Anta 18 px con `letter-spacing: 0.02em` (solo desde 1024 px de ancho; por debajo queda el monograma). Al pasar el cursor, el monograma gira −14° y crece 8 %.
- Centro: enlaces *Work, About, Experience, Contact* (*Proyectos, Sobre mí, Experiencia, Contacto* en español) con separación de 32 px.
- Derecha: selector de idioma y selector de tema, con 10 px de separación.

**Sección activa**

- Se marca al hacer clic y, cuando existen las secciones, también al hacer scroll (`IntersectionObserver`, hook `useActiveSection`).
- El enlace activo pasa a `--color-secondary` y muestra un cuadrito rojo de 7 px que gira al aparecer (350 ms, curva con rebote).
- Los destinos son `#work`, `#about`, `#exp` y `#contact`; el logo lleva a `#top`. Con la barra fija, `html` usa `scroll-padding-top: 81px`.

**Efecto glitch**

- Dos capas fantasma (roja `--color-secondary` y azul `--color-primary`) más un temblor breve, solo en hover o foco de teclado sobre enlaces y logo.
- Con `prefers-reduced-motion: reduce` las capas fantasma se desactivan.
- Componente `GlitchText` y clases `.glitch` / `.glitch-host` en `globals.css`.

**Móvil (760 px o menos)**

- Se ocultan los enlaces, el nombre y el selector de tema de la barra; aparece el botón hamburguesa de 44 px, que se transforma en una X al abrirse. Padding de la barra: 18 px 20 px.
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

- Composición: dos columnas en escritorio (7 + 5 de 12); en pantallas de 900 px o menos pasa a una columna con la foto arriba.
- Columna de texto: `01 /` con insignia «Open to new opportunities», línea `$ whoami → Gabriel Augusto Peñaranda Caldas`, titular que se escribe letra por letra, introducción, botón principal y secundario (con efecto magnético) y una fila con la ciudad y los tres rasgos profesionales. Textos EN / ES en `src/content/hero.ts`.
- Titular: «¡Hola! Soy Gabo. Y creo software que se siente humano.» / «Hi! I'm Gabo. And I build software that feels human.»
- Perfil: Cloud & AI Software Engineer en Lima, Perú. Rasgos mostrados: pragmático, entusiasta por aprender y honrado.
- Fondo del hero: ocupa todo el ancho de la pantalla y la altura visible bajo la barra (`100svh − 81 px`), con el contenido centrado en vertical. Es una retícula tipo plano técnico que se desvanece hacia los bordes y líneas de escaneo sutiles.

**Foto de perfil: «Ecualizador»**

- Foto circular grande: 280 px en escritorio, 240 px en tableta y 190 px en móvil (480 px o menos), con un aro de 4 px rojo, azul y amarillo que gira cada 7 s. Las barras y el área de la escena escalan con el tamaño de la foto. Archivo: `public/images/gabriel-perfil.webp`.
- 56 barras de 4 px alrededor de la foto, de largo proporcional a su tamaño (20 %), que laten con el tiempo. Su color recorre rojo, azul y amarillo al mismo ritmo que el aro.
- El movimiento horizontal del cursor o del dedo da «energía» a las barras, que crecen y luego se calman.
- La escena se inclina hasta 8° hacia el cursor.
- Cada 3.5 a 6.5 s, y al tocar la foto, una interferencia breve (650 ms) distorsiona la imagen con una banda de luz que la recorre.
- Con `prefers-reduced-motion: reduce` el aro no gira, las barras quedan quietas, no hay inclinación ni interferencia.
- La foto lleva texto alternativo en el idioma activo y se carga con prioridad (`priority`).

### 10. Iconografía e imágenes

- Iconos de línea, trazo de 1.5 px, esquinas redondeadas (por ejemplo Lucide o Phosphor).
- Foto de perfil: `public/images/gabriel-perfil.webp` (994 × 994 px, cuadrada para recortarla en círculo). Logo y fotografías de proyectos: pendientes de entrega; mientras tanto, la barra usa un monograma GP provisional en SVG.
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
│   └── Hero-01/
├── public/
│   └── images/
└── src/
    ├── app/
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
    │       └── hero.tsx
    ├── content/
    │   ├── hero.ts
    │   └── nav.ts
    ├── hooks/
    │   ├── use-active-section.ts
    │   ├── use-magnetic.ts
    │   ├── use-prefers-reduced-motion.ts
    │   └── use-typewriter.ts
    └── lib/
        └── locale.ts
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
| `mock-ups/Hero-01/` | Un mock-up por carpeta, con nombre `<Pantalla>-<número>`. `Hero-01` agrupa los diseños de la portada: `Main.dc.html` (composición general), `nav-01.html` (barra de navegación) y `Signal Ring Hero.html` (seis ideas para la foto de perfil). Incluye su propio `README.md` con instrucciones para verlos. Al añadir más pantallas se crean carpetas hermanas (`About-02`, `Projects-03`...). |
| `public/images/` | Fotografías, logo, monograma e imágenes de proyectos. Formato WebP o AVIF con texto alternativo, según la guía de estilo (sección 10). |
| `src/app/` | Enrutador de Next.js (App Router). Cada carpeta con un `page.tsx` es una ruta. Aquí viven también el `layout.tsx` raíz (fuentes, proveedor de tema, `lang`), los estilos globales (`globals.css` con los tokens de la sección 3) y el favicon. Contiene solo la composición de páginas, no la lógica de interfaz. Hoy: `layout.tsx` monta los proveedores de tema e idioma y la barra de navegación. |
| `src/components/` | Todos los componentes de React reutilizables. Se divide en tres subcarpetas según su alcance (ver nivel 3). |
| `src/content/` | Los textos del sitio y los datos de los proyectos, separados del diseño. Facilita el selector EN / ES (sección 11): cada idioma tiene su entrada y cambiar un texto no obliga a tocar componentes. Hoy: `nav.ts` y `hero.ts` con los textos EN / ES de la barra y del hero. |
| `src/hooks/` | Hooks personalizados de React (por ejemplo, seguir el cursor para las tarjetas inclinadas y los botones magnéticos, o detectar `prefers-reduced-motion`). Evitan repetir lógica entre componentes. Hoy: `use-active-section` (qué sección cruza la mitad de la pantalla, para marcarla en la barra), `use-typewriter` (titular que se escribe), `use-magnetic` (botones magnéticos) y `use-prefers-reduced-motion`. |
| `src/lib/` | Funciones de apoyo y constantes que no son componentes ni hooks: utilidades para combinar clases CSS, formateo de fechas, configuración del sitio. Son funciones puras fáciles de probar. Hoy: `locale.ts` con los idiomas disponibles (`en`, `es`), el idioma por defecto y la clave de almacenamiento. |

#### Nivel 3: dentro de `src/components/`

| Carpeta | Por qué existe |
|---|---|
| `ui/` | Piezas pequeñas y genéricas que no conocen el contenido del portafolio: botón principal y secundario, enlace, insignia, tarjeta, selector de tema, selector de idioma (sección 9). Se pueden usar en cualquier parte. Hoy: `ButtonLink`, `GlitchText`, `LanguageSwitcher` y `ThemeToggle`. |
| `layout/` | Estructura que se repite en todas las páginas: barra de navegación, pie de página y los proveedores de tema e idioma. Define el marco dentro del cual se muestra cada página. Hoy: `Navbar` (sección 9.1), `ThemeProvider` (`next-themes`, atributo `data-theme`) y `LocaleProvider`, que guarda el idioma elegido en `localStorage` y actualiza el atributo `lang` de la página. |
| `sections/` | Bloques grandes de una página, uno por idea principal: hero, proyectos, experiencia, contacto. Combinan componentes de `ui/` con textos de `content/`. Cada sección corresponde a una numerada (`01 /`, `02 /`) en el diseño. |

#### Regla de dependencias

El flujo va de lo general a lo específico: `app/` usa `layout/` y `sections/`; `layout/` y `sections/` usan `ui/`, `hooks/`, `lib/` y `content/`; `ui/` usa `hooks/`, `lib/` y `content/`, y puede leer el idioma y el tema a través de `useLocale()` y `useTheme()`. Una carpeta nunca importa de otra que esté por encima en este flujo, y `ui/` nunca importa de `sections/`. Esto evita dependencias circulares y mantiene los componentes pequeños reutilizables.
