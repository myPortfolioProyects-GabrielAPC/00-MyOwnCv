import { LOCALES, isLocale } from "@/lib/locale";
import { workRepository } from "@/server/work";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: RouteContext<"/api/[locale]/experience.json">) {
  const { locale } = await params;
  if (!isLocale(locale)) return Response.json({ error: "Unsupported locale" }, { status: 404 });
  return Response.json(await workRepository.experience(locale));
}
