const DURATION = 450;

let frame = 0;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

function stop() {
  cancelAnimationFrame(frame);
  window.removeEventListener("wheel", stop);
  window.removeEventListener("touchstart", stop);
  window.removeEventListener("keydown", stop);
}

/**
 * Scrolls the page to an element quickly and smoothly, leaving room for the
 * sticky header. Jumps straight there when the user prefers reduced motion.
 * The user scrolling, swiping or pressing a key cancels the animation.
 */
export function smoothScrollTo(target: Element) {
  stop();
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const startY = window.scrollY;
  const endY = Math.min(Math.max(target.getBoundingClientRect().top + startY - offset, 0), maxY);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, endY);
    return;
  }

  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / DURATION, 1);
    window.scrollTo(0, startY + (endY - startY) * easeOutCubic(progress));
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  frame = requestAnimationFrame(step);
}
