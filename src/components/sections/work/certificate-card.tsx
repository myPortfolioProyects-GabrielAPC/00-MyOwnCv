import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { SampleBadge } from "@/components/sections/work/sample-badge";
import { Tag } from "@/components/sections/work/tag";
import type { work } from "@/content/work";
import type { Certificate } from "@/domain/work/certificate";
import type { Selection } from "@/domain/work/filters";
import { yearOf } from "@/domain/work/period";

type Copy = (typeof work)["en"];

export function CertificateCard({
  certificate,
  selection,
  copy,
  index,
}: {
  certificate: Certificate;
  selection: Selection;
  copy: Copy;
  index: number;
}) {
  const earned = certificate.status === "earned";

  return (
    <article
      className="work-in relative flex min-w-0 flex-col border border-border bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-(--ease-out) hover:-translate-y-[3px] hover:border-primary hover:shadow-(--work-glow)"
      style={{ "--k": index } as React.CSSProperties}
    >
      {certificate.sample && <SampleBadge label={copy.sample} />}
      <div className="flex items-center gap-3.5 border-b border-border p-4 pr-[76px]">
        {certificate.image ? (
          <span className="relative size-24 flex-none overflow-hidden border-[1.5px] border-transparent">
            <Image
              src={certificate.image.src}
              alt={certificate.image.alt}
              fill
              sizes="96px"
              className="object-contain"
            />
          </span>
        ) : (
          <span className="work-seal relative grid size-14 flex-none place-items-center rounded-full border-[1.5px] border-primary font-display text-[0.8125rem]">
            {certificate.badge}
          </span>
        )}
        {!certificate.image && (
          <span className="font-mono text-xs/[1.4] text-text-muted">
            <b className="block text-[0.8125rem] font-medium text-text">{certificate.issuer}</b>
            {yearOf(certificate.date)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h4 className="m-0 font-display text-xl/[1.2] tracking-[0.02em] text-balance">
          {certificate.name}
        </h4>
        {!earned && (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary before:size-2 before:border-[1.5px] before:border-current">
            {copy.status[certificate.status]}
          </span>
        )}
        {(certificate.credentialId || certificate.expires) && (
          <p className="m-0 flex flex-col gap-0.5 font-mono text-xs text-text-muted">
            {certificate.expires && (
              <span>
                {copy.expires} {certificate.expires}
              </span>
            )}
            {certificate.credentialId && (
              <span className="break-all">
                {copy.credentialId}: {certificate.credentialId}
              </span>
            )}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          <Tag variant="cloud" hit={selection.category?.includes(certificate.category) ?? false}>
            {copy.categories[certificate.category]}
          </Tag>
        </div>
      </div>
      {certificate.credentialUrl && (
        <div className="flex gap-4 border-t border-border px-4 py-1 font-mono text-[0.8125rem] desk:py-2.5">
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 desk:min-h-0 desk:coarse:min-h-11 items-center gap-1.5 text-primary hover:underline hover:underline-offset-[3px]"
          >
            <ExternalLink size={18} strokeWidth={1.6} aria-hidden="true" />
            {copy.verify}
          </a>
        </div>
      )}
    </article>
  );
}
