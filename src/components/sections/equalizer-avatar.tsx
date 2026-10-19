"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BAR_COUNT = 56;
const COLORS = ["var(--color-secondary)", "var(--color-primary)", "var(--color-accent)"];

function barHeight(index: number, t: number, energy: number) {
  const wave = (0.5 + 0.5 * Math.sin(index * 0.9 + t * 4)) * (0.5 + 0.5 * Math.sin(index * 0.37 - t * 2.3));
  return 0.25 + 0.35 * wave + energy * 0.6 * (0.5 + 0.5 * Math.sin(index * 1.7 + t * 9));
}

function barColor(index: number, t: number) {
  const angle = (index / BAR_COUNT) * 360;
  const shifted = (((angle + t * 51.4) % 360) + 360) % 360;
  return COLORS[Math.floor(shifted / 120)];
}

/**
 * Round photo with a rotating tricolor ring and a circular equalizer around it.
 * Bars react to pointer movement, the scene tilts toward the cursor, and every
 * few seconds (or on tap) the photo gets a short interference glitch.
 */
export function EqualizerAvatar({ alt }: { alt: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const filterId = `eq-glitch-${useId().replace(/:/g, "")}`;

  const stageRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<SVGFETurbulenceElement>(null);
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null);
  const glitchRef = useRef<() => void>(() => {});
  const energyRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  // The animation loops only run while the avatar is on screen.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Equalizer loop.
  useEffect(() => {
    if (reducedMotion || !visible) return;
    const bars = Array.from(barsRef.current?.children ?? []) as HTMLElement[];
    const colors: string[] = [];
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      energyRef.current *= 0.96;
      bars.forEach((bar, i) => {
        bar.style.setProperty("--h", barHeight(i, t, energyRef.current).toFixed(3));
        const color = barColor(i, t);
        if (colors[i] !== color) {
          colors[i] = color;
          bar.style.backgroundColor = color;
        }
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, visible]);

  // Interference glitch: random interval and on tap.
  useEffect(() => {
    if (reducedMotion || !visible) return;
    const avatar = avatarRef.current;
    const photo = photoRef.current;
    const noise = noiseRef.current;
    const displace = displaceRef.current;
    if (!avatar || !photo || !noise || !displace) return;

    let busy = false;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      displace.setAttribute("scale", "0");
      photo.style.filter = "";
      avatar.classList.remove("is-glitching");
      busy = false;
    };

    const run = () => {
      if (busy) return;
      busy = true;
      photo.style.filter = `url(#${filterId})`;
      avatar.classList.remove("is-glitching");
      void avatar.offsetWidth;
      avatar.classList.add("is-glitching");

      const startedAt = performance.now();
      const duration = 650;
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        displace.setAttribute("scale", (Math.sin(progress * Math.PI) * 14).toFixed(1));
        if (Math.random() < 0.4) noise.setAttribute("seed", String(Math.floor(Math.random() * 90)));
        if (progress < 1) frame = requestAnimationFrame(step);
        else reset();
      };
      frame = requestAnimationFrame(step);
    };

    const schedule = () => {
      timer = setTimeout(() => {
        run();
        schedule();
      }, 3500 + Math.random() * 3000);
    };

    glitchRef.current = run;
    schedule();
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      glitchRef.current = () => {};
      reset();
    };
  }, [reducedMotion, visible, filterId]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width * 2 - 1).toFixed(3));
    stage.style.setProperty("--my", ((event.clientY - rect.top) / rect.height * 2 - 1).toFixed(3));
    if (lastXRef.current !== null) {
      energyRef.current = Math.min(1, energyRef.current + Math.abs(event.clientX - lastXRef.current) / 80);
    }
    lastXRef.current = event.clientX;
  };

  const onPointerLeave = () => {
    stageRef.current?.style.setProperty("--mx", "0");
    stageRef.current?.style.setProperty("--my", "0");
    lastXRef.current = null;
  };

  return (
    <div
      ref={stageRef}
      className="eq-stage"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={() => glitchRef.current()}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            ref={noiseRef}
            type="fractalNoise"
            baseFrequency="0.004 0.09"
            numOctaves="1"
            seed="3"
            result="n"
          />
          <feDisplacementMap
            ref={displaceRef}
            in="SourceGraphic"
            in2="n"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="eq-scene">
        <div ref={avatarRef} className="eq-av">
          <div ref={photoRef} className="eq-photo">
            <Image
              src="/images/gabriel-perfil.webp"
              alt={alt}
              fill
              priority
              sizes="(min-width: 56.25rem) 280px, 240px"
              className="object-cover"
            />
          </div>
          <div className="eq-band" />
        </div>

        <div ref={barsRef} className="eq-bars" aria-hidden="true">
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <i
              key={i}
              className="eq-bar"
              style={
                {
                  "--a": `${((i / BAR_COUNT) * 360).toFixed(3)}deg`,
                  "--h": barHeight(i, 0, 0).toFixed(3),
                  backgroundColor: barColor(i, 0),
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
