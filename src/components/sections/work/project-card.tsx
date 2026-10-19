import { ExternalLink } from "lucide-react";
import { SampleBadge } from "@/components/sections/work/sample-badge";
import { ProjectThumb } from "@/components/sections/work/project-thumb";
import { Tag } from "@/components/sections/work/tag";
import type { Selection } from "@/domain/work/filters";
import type { Project } from "@/domain/work/project";
import type { work } from "@/content/work";

type Copy = (typeof work)["en"];

export function ProjectCard({
  project,
  selection,
  copy,
  index,
}: {
  project: Project;
  selection: Selection;
  copy: Copy;
  index: number;
}) {
  const { links } = project;
  const hit = (key: string, value: string) => selection[key]?.includes(value) ?? false;

  return (
    <article
      className="work-in group relative flex min-w-0 flex-col border border-border bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-(--ease-out) hover:-translate-y-[3px] hover:border-primary hover:shadow-(--work-glow)"
      style={{ "--k": index } as React.CSSProperties}
    >
      {project.sample && <SampleBadge label={copy.sample} />}
      <ProjectThumb id={project.id} image={project.image} />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <p className="m-0 font-mono text-xs font-medium text-secondary">{project.year}</p>
        <h4 className="m-0 font-display text-xl/[1.2] tracking-[0.02em] text-balance">
          {project.name}
        </h4>
        <p className="m-0 text-[15px] text-text-muted">{project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.languages.map((value) => (
            <Tag key={`l-${value}`} hit={hit("language", value)}>
              {value}
            </Tag>
          ))}
          {project.cloud.map((value) => (
            <Tag key={`c-${value}`} variant="cloud" hit={hit("cloud", value)}>
              {value}
            </Tag>
          ))}
        </div>
      </div>
      {(links.demo || links.repository) && (
        <div className="flex gap-4 border-t border-border px-4 py-2.5 font-mono text-[13px]">
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline hover:underline-offset-[3px]"
            >
              <ExternalLink size={18} strokeWidth={1.6} aria-hidden="true" />
              {copy.liveDemo}
            </a>
          )}
          {links.repository && (
            <a
              href={links.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline hover:underline-offset-[3px]"
            >
              {copy.repository}
            </a>
          )}
        </div>
      )}
    </article>
  );
}
