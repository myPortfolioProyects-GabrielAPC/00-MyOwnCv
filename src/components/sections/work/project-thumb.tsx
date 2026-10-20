import Image from "next/image";
import type { WorkImage } from "@/domain/work/image";

function seedOf(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  return (hash % 97) + 1;
}

/** Project image, or a geometric thumbnail generated from the project id. */
export function ProjectThumb({ id, image }: { id: string; image?: WorkImage }) {
  if (image) {
    return (
      <div className="relative aspect-[16/8] overflow-hidden border-b border-border">
        <Image src={image.src} alt={image.alt} fill sizes="320px" className="object-cover" />
      </div>
    );
  }

  const s = seedOf(id);
  const a = 30 + ((s * 37) % 50);
  const b = 20 + ((s * 53) % 40);
  const x = ((s * 29) % 60) + 15;
  const y = ((s * 17) % 30) + 15;
  const orb =
    "absolute rounded-full border-[1.5px] transition-transform duration-[800ms] ease-(--ease-out) group-hover:rotate-40 group-hover:scale-106";

  return (
    <div
      aria-hidden="true"
      className="work-thumb-bg relative aspect-[16/8] max-w-full overflow-hidden border-b border-border"
    >
      <span
        className={`${orb} border-primary`}
        style={{ width: a + 60, height: a + 60, left: `${x}%`, top: `${y - 20}%` }}
      />
      <span
        className={`${orb} border-dashed border-secondary`}
        style={{ width: b + 30, height: b + 30, left: `${x + 8}%`, top: `${y + 2}%` }}
      />
      <span
        className="absolute size-3 rounded-full bg-accent"
        style={{ left: `${(x + 30) % 85}%`, top: `${y + 10}%` }}
      />
      <span className="absolute bottom-2.5 left-3 font-mono text-xs text-text-muted">
        ./{id}
      </span>
    </div>
  );
}
