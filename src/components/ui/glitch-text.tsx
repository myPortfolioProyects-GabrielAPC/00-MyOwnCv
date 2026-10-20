/**
 * Text with red/blue ghost layers. The effect only plays while an ancestor
 * with the `glitch-host` class is hovered or focused (see globals.css).
 */
export function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span data-text={children} className={`glitch ${className}`}>
      {children}
    </span>
  );
}
