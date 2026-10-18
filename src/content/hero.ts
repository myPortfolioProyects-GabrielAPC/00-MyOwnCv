import type { Locale } from "@/lib/locale";

export const hero = {
  en: {
    status: "Implementing AI into the software life cycle",
    fullName: "Gabriel Augusto Peñaranda Caldas",
    headline: "Hi! I'm Gabo. And I build software that feels human.",
    intro:
      "I'm a Cloud & AI Software Engineer who turns complex problems into clear, reliable products. Here are several of my personal projects. Thanks for being here!",
    ctaWork: "See my work",
    ctaCv: "Download CV",
    city: "Lima, Peru",
    traits: ["Pragmatic", "Eager to learn", "Honest"],
    photoAlt: "Portrait of Gabriel Augusto Peñaranda Caldas",
  },
  es: {
    status: "Implementando IA en el ciclo de vida del software",
    fullName: "Gabriel Augusto Peñaranda Caldas",
    headline: "¡Hola! Soy Gabo. Y creo software que se siente humano.",
    intro:
      "Soy Cloud & AI Software Engineer que convierte problemas complejos en productos claros y confiables. Aquí está varios de mis proyectos personales. Gracias por estar aquí!",
    ctaWork: "Ver mis proyectos",
    ctaCv: "Descargar CV",
    city: "Lima, Perú",
    traits: ["Pragmático", "Entusiasta por aprender", "Honrado"],
    photoAlt: "Retrato de Gabriel Augusto Peñaranda Caldas",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;
