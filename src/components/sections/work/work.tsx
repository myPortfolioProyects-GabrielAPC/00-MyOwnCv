"use client";

import { ListFilter, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { CertificateCard } from "@/components/sections/work/certificate-card";
import { buildRailGroups, selectedCount, type RailGroup } from "@/components/sections/work/filter-model";
import { FilterRail } from "@/components/sections/work/filter-rail";
import { ExperienceRow } from "@/components/sections/work/experience-row";
import { ProjectCard } from "@/components/sections/work/project-card";
import { SizeControls } from "@/components/sections/work/size-controls";
import { WorkTabs, tabId } from "@/components/sections/work/work-tabs";
import { work, type WorkTab } from "@/content/work";
import type { Certificate } from "@/domain/work/certificate";
import type { Experience } from "@/domain/work/experience";
import {
  applyFilters,
  certificateFilters,
  experienceFilters,
  projectFilters,
  type FilterGroup,
  type FilterValue,
  type Selection,
} from "@/domain/work/filters";
import type { Project } from "@/domain/work/project";
import { useWorkCollection, type CollectionState } from "@/hooks/use-work-collection";
import { useWorkZoom } from "@/hooks/use-work-zoom";
import { DESKTOP_QUERY } from "@/lib/breakpoints";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const RAIL_ID = "work-filters";

type View<T> = {
  state: CollectionState<T>;
  items: T[];
  groups: readonly FilterGroup<T>[];
  selection: Selection;
  visible: T[];
};

function makeView<T>(
  state: CollectionState<T>,
  groups: readonly FilterGroup<T>[],
  selection: Selection,
): View<T> {
  const items = state.status === "ready" ? state.items : [];
  return { state, items, groups, selection, visible: applyFilters(items, groups, selection) };
}

export function Work() {
  const { locale } = useLocale();
  const t = work[locale];
  const [tab, setTab] = useState<WorkTab>("projects");
  const [selections, setSelections] = useState<Record<WorkTab, Selection>>({
    projects: {},
    experience: {},
    certificates: {},
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const size = useWorkZoom();
  const [currentYear] = useState(() => new Date().getFullYear());
  const [yearGroups] = useState(() => experienceFilters(currentYear));

  const projects = useWorkCollection<Project>("projects", locale);
  const experience = useWorkCollection<Experience>("experience", locale);
  const certificates = useWorkCollection<Certificate>("certificates", locale);

  const views = {
    projects: makeView(projects.state, projectFilters, selections.projects),
    experience: makeView(experience.state, yearGroups, selections.experience),
    certificates: makeView(certificates.state, certificateFilters, selections.certificates),
  };
  const retries = { projects: projects.retry, experience: experience.retry, certificates: certificates.retry };

  const titleOf = (key: string) => t.groups[key] ?? key;
  const labelOf = (key: string, value: FilterValue) =>
    key === "category" ? (t.categories[String(value)] ?? String(value)) : String(value);

  let railGroups: RailGroup[];
  if (tab === "projects") {
    railGroups = buildRailGroups(views.projects.items, projectFilters, selections.projects, titleOf, labelOf);
  } else if (tab === "experience") {
    railGroups = buildRailGroups(views.experience.items, yearGroups, selections.experience, titleOf, labelOf);
  } else {
    railGroups = buildRailGroups(views.certificates.items, certificateFilters, selections.certificates, titleOf, labelOf);
  }

  const selection = selections[tab];
  const activeCount = selectedCount(selection);
  const current = views[tab];
  const resultCount = current.visible.length;
  const total = current.items.length;
  const ready = current.state.status === "ready";

  const counts = {
    projects: views.projects.state.status === "ready" ? String(views.projects.visible.length) : "·",
    experience: views.experience.state.status === "ready" ? String(views.experience.visible.length) : "·",
    certificates: views.certificates.state.status === "ready" ? String(views.certificates.visible.length) : "·",
  };

  const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0 });

  const selectTab = (next: WorkTab) => {
    setTab(next);
    scrollToTop();
  };

  const toggle = (key: string, value: FilterValue) => {
    scrollToTop();
    setSelections((previous) => {
      const chosen = previous[tab][key] ?? [];
      const next = chosen.includes(value) ? chosen.filter((item) => item !== value) : [...chosen, value];
      return { ...previous, [tab]: { ...previous[tab], [key]: next } };
    });
  };
  const clear = () => {
    scrollToTop();
    setSelections((previous) => ({ ...previous, [tab]: {} }));
  };

  // The nav's "Experience" link opens that tab instead of scrolling to a section.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a[href="#exp"]');
      if (!link) return;
      event.preventDefault();
      setTab("experience");
      scrollRef.current?.scrollTo({ top: 0 });
      const section = document.getElementById("work");
      if (section) smoothScrollTo(section);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Filter drawer on narrow screens: Esc closes it, the page does not scroll behind it.
  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [drawerOpen]);

  // Full-window dashboard: Esc or leaving the desktop layout exits, the page does not scroll behind it.
  useEffect(() => {
    if (!maximized) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMaximized(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setMaximized(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [maximized]);

  const pills = railGroups.flatMap((group) =>
    (selection[group.key] ?? []).map((value) => ({
      key: group.key,
      value,
      label: labelOf(group.key, value),
    })),
  );

  const grid = tab === "experience" && resultCount > 0
    ? "ml-1.5 grid grid-cols-1 border-l border-border-strong"
    : tab === "certificates"
      ? "grid grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))] gap-4"
      : "grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4";

  return (
    <section id="work" aria-labelledby="work-title" className="relative px-6 pt-8 pb-32">
      <div aria-hidden="true" className="work-section-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-scan pointer-events-none absolute inset-0" />
      <div
        className={
          maximized
            ? "fixed inset-0 z-[60] flex flex-col gap-4 bg-bg px-6 py-4"
            : "relative mx-auto flex w-full max-w-[calc(1680px*var(--work-auto-zoom))] flex-col gap-7"
        }
      >
        <div className="work-auto-zoom flex flex-wrap items-end justify-between gap-4">
          <header className="flex flex-col gap-1.5">
            <p className="m-0 font-mono text-sm text-text-muted">
              <b className="font-medium text-primary">&gt;</b> cd ./
              <span className="text-secondary">{t.slug[tab]}</span>
            </p>
            <h2
              id="work-title"
              className="m-0 font-display text-[clamp(2.125rem,6vw,3.75rem)] leading-[1.05] font-normal tracking-[0.02em] text-balance"
            >
              <span className="mr-2.5 align-[0.7em] text-[0.5em] text-secondary">02 /</span>
              {t.title}
            </h2>
          </header>
          <SizeControls
            zoom={size.zoom}
            maximized={maximized}
            canZoomIn={size.canZoomIn}
            canZoomOut={size.canZoomOut}
            copy={t}
            onZoomIn={size.zoomIn}
            onZoomOut={size.zoomOut}
            onReset={size.reset}
            onToggleMaximized={() => setMaximized((value) => !value)}
          />
        </div>

        {/* Fixed height: results and filters scroll inside the panel. */}
        <div
          className={`work-box relative flex flex-col border border-border bg-surface shadow-(--work-glow) ${
            maximized ? "min-h-0 flex-1" : "h-[37.5rem] desk:h-[40rem]"
          }`}
        >
          <WorkTabs tab={tab} label={t.tabsLabel} labels={t.tabs} counts={counts} onSelect={selectTab} />

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] desk:grid-cols-[260px_minmax(0,1fr)]">
            <div
              aria-hidden="true"
              onClick={() => setDrawerOpen(false)}
              className={`fixed inset-0 z-[35] bg-(--work-scrim) transition-opacity duration-300 desk:hidden ${
                drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
            <FilterRail
              id={RAIL_ID}
              open={drawerOpen}
              groups={railGroups}
              activeCount={activeCount}
              resultCount={resultCount}
              copy={t}
              onToggle={toggle}
              onClear={clear}
              onClose={() => setDrawerOpen(false)}
            />

            <div
              id="work-panel"
              role="tabpanel"
              aria-labelledby={tabId(tab)}
              aria-live="polite"
              className="relative flex min-h-0 min-w-0 flex-col"
            >
              <div aria-hidden="true" className="work-grid-bg pointer-events-none absolute inset-0" />

              <div className="relative flex flex-none flex-col gap-[18px] px-3.5 pt-[18px] desk:px-6 desk:pt-6">
                <div className="relative flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                  <p className="m-0 min-w-[200px] flex-1 font-mono text-sm text-text-muted">
                    <b className="font-medium text-primary">&gt;</b> query {t.nouns[tab]}{" "}
                    <em className="not-italic text-text">
                      {resultCount} / {total}
                    </em>
                    <span className="nav-blink">_</span>
                  </p>
                  <button
                    type="button"
                    aria-controls={RAIL_ID}
                    aria-expanded={drawerOpen}
                    onClick={() => setDrawerOpen(true)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-border bg-surface px-3.5 text-[0.9375rem] desk:hidden"
                  >
                    <ListFilter size={18} strokeWidth={1.6} aria-hidden="true" />
                    {t.filters}
                    <span className="min-w-5 bg-primary px-1.5 text-center font-mono text-xs font-medium text-on-primary">
                      {activeCount}
                    </span>
                  </button>
                </div>

                {pills.length > 0 && (
                  <div className="relative flex flex-wrap gap-1.5">
                    {pills.map((pill) => (
                      <button
                        key={`${pill.key}-${pill.value}`}
                        type="button"
                        aria-label={`${t.removeFilter} ${pill.label}`}
                        onClick={() => toggle(pill.key, pill.value)}
                        className="inline-flex min-h-11 desk:min-h-0 desk:coarse:min-h-11 cursor-pointer items-center gap-1.5 border border-primary bg-transparent px-2 font-mono text-xs text-primary transition-colors hover:bg-primary hover:text-on-primary"
                      >
                        {pill.label}
                        <X size={10} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div
                ref={scrollRef}
                className="relative min-h-0 flex-1 overflow-y-auto px-3.5 pt-[18px] pb-6 desk:px-6"
              >
                <div
                  className={`work-results relative ${grid}`}
                  style={{ "--work-user-zoom": size.zoom } as CSSProperties}
                >
                  {current.state.status === "loading" && (
                    <p className="col-span-full m-0 font-mono text-sm text-text-muted">{t.loading}</p>
                  )}
                  {current.state.status === "error" && (
                    <div className="col-span-full flex flex-col items-center gap-3 border border-dashed border-border-strong px-5 py-10 text-center font-mono text-sm text-text-muted">
                      {t.error}
                      <button
                        type="button"
                        onClick={retries[tab]}
                        className="min-h-11 cursor-pointer border border-primary bg-transparent px-3.5 font-sans text-[0.9375rem] text-primary"
                      >
                        {t.retry}
                      </button>
                    </div>
                  )}
                  {ready && resultCount === 0 && (
                    <div className="col-span-full flex flex-col items-center gap-3 border border-dashed border-border-strong px-5 py-10 text-center font-mono text-sm text-text-muted">
                      {t.empty}
                      <button
                        type="button"
                        onClick={clear}
                        className="min-h-11 cursor-pointer border border-primary bg-transparent px-3.5 font-sans text-[0.9375rem] text-primary"
                      >
                        {t.clearFilters}
                      </button>
                    </div>
                  )}
                  {tab === "projects" &&
                    views.projects.visible.map((project, index) => (
                      <ProjectCard key={project.id} project={project} selection={selection} copy={t} index={index} />
                    ))}
                  {tab === "experience" &&
                    views.experience.visible.map((item, index) => (
                      <ExperienceRow key={item.id} item={item} selection={selection} copy={t} index={index} />
                    ))}
                  {tab === "certificates" &&
                    views.certificates.visible.map((certificate, index) => (
                      <CertificateCard
                        key={certificate.id}
                        certificate={certificate}
                        selection={selection}
                        copy={t}
                        index={index}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
