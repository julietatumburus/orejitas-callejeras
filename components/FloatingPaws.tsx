import type { CSSProperties } from "react";

function Paw({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" className={className} style={style}>
      <ellipse cx="256" cy="356" rx="132" ry="108" />
      <ellipse cx="129" cy="223" rx="53" ry="70" />
      <ellipse cx="210" cy="150" rx="50" ry="68" />
      <ellipse cx="302" cy="150" rx="50" ry="68" />
      <ellipse cx="383" cy="223" rx="53" ry="70" />
    </svg>
  );
}

/**
 * Decoración: huellas dibujadas (no emoji) en tono crema, sobre el lateral
 * izquierdo, con un movimiento suave. Pensado para ser armónico y discreto.
 */
export default function FloatingPaws({
  colorClass = "text-[#fdf3e8]/20",
}: {
  colorClass?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Paw
        className={`animate-paw-float absolute -left-10 top-8 h-44 w-44 sm:h-60 sm:w-60 ${colorClass}`}
        style={{ animationDuration: "4.5s" }}
      />
      <Paw
        className={`animate-paw-float absolute left-24 top-56 hidden h-24 w-24 sm:block ${colorClass}`}
        style={{ animationDuration: "5.8s", animationDelay: "0.7s" }}
      />
    </div>
  );
}
