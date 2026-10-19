import type { Locale } from "@/lib/locale";

export type WorkTab = "projects" | "experience" | "certificates";

type WorkCopy = {
  title: string;
  tabsLabel: string;
  tabs: Record<WorkTab, string>;
  slug: Record<WorkTab, string>;
  nouns: Record<WorkTab, string>;
  filters: string;
  clear: string;
  clearFilters: string;
  closeFilters: string;
  removeFilter: string;
  legend: string;
  groups: Record<string, string>;
  categories: Record<string, string>;
  status: Record<string, string>;
  liveDemo: string;
  repository: string;
  verify: string;
  now: string;
  sample: string;
  empty: string;
  loading: string;
  error: string;
  retry: string;
  size: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  showResults: (count: number) => string;
};

export const work: Record<Locale, WorkCopy> = {
  en: {
    title: "Work",
    tabsLabel: "Work sections",
    tabs: { projects: "Projects", experience: "Experience", certificates: "Certificates" },
    slug: { projects: "work/projects", experience: "work/experience", certificates: "work/certificates" },
    nouns: { projects: "projects", experience: "roles", certificates: "certificates" },
    filters: "Filters",
    clear: "Clear",
    clearFilters: "Clear filters",
    closeFilters: "Close filters",
    removeFilter: "Remove",
    legend: "// same group = any match · different groups = all must match",
    groups: {
      language: "Programming language",
      cloud: "Cloud infrastructure",
      tag: "Tag",
      year: "Year",
      category: "Category",
    },
    categories: { aws: "AWS", gcp: "GCP", language: "Programming language", ux: "UX/UI" },
    status: { earned: "Earned", "in-progress": "In progress" },
    liveDemo: "Live demo",
    repository: "GitHub",
    verify: "Verify credential",
    now: "now",
    sample: "SAMPLE",
    empty: "> 0 results for this combination",
    loading: "Loading…",
    error: "Could not load this section.",
    retry: "Try again",
    size: "Dashboard size",
    zoomIn: "Make everything bigger",
    zoomOut: "Make everything smaller",
    zoomReset: "Reset size",
    showResults: (count) => `Show ${count} result${count === 1 ? "" : "s"}`,
  },
  es: {
    title: "Proyectos",
    tabsLabel: "Secciones de proyectos",
    tabs: { projects: "Proyectos", experience: "Experiencia", certificates: "Certificados" },
    slug: {
      projects: "trabajo/proyectos",
      experience: "trabajo/experiencia",
      certificates: "trabajo/certificados",
    },
    nouns: { projects: "proyectos", experience: "puestos", certificates: "certificados" },
    filters: "Filtros",
    clear: "Limpiar",
    clearFilters: "Limpiar filtros",
    closeFilters: "Cerrar filtros",
    removeFilter: "Quitar",
    legend: "// mismo grupo = cualquiera · grupos distintos = deben cumplirse todos",
    groups: {
      language: "Lenguaje de programación",
      cloud: "Infraestructura cloud",
      tag: "Tag",
      year: "Año",
      category: "Categoría",
    },
    categories: { aws: "AWS", gcp: "GCP", language: "Lenguaje de programación", ux: "UX/UI" },
    status: { earned: "Obtenido", "in-progress": "En curso" },
    liveDemo: "Demo",
    repository: "GitHub",
    verify: "Verificar credencial",
    now: "hoy",
    sample: "EJEMPLO",
    empty: "> 0 resultados para esta combinación",
    loading: "Cargando…",
    error: "No se pudo cargar esta sección.",
    retry: "Reintentar",
    size: "Tamaño del dashboard",
    zoomIn: "Hacer todo más grande",
    zoomOut: "Hacer todo más pequeño",
    zoomReset: "Restablecer tamaño",
    showResults: (count) => `Ver ${count} resultado${count === 1 ? "" : "s"}`,
  },
};
