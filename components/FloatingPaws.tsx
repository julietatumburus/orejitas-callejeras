/** Patitas 🐾 que flotan hacia arriba de fondo (decorativo, animación CSS). */
const PAWS = [
  { left: "6%", size: "text-2xl", dur: "16s", delay: "0s" },
  { left: "18%", size: "text-4xl", dur: "22s", delay: "5s" },
  { left: "32%", size: "text-xl", dur: "14s", delay: "2s" },
  { left: "47%", size: "text-3xl", dur: "20s", delay: "8s" },
  { left: "61%", size: "text-2xl", dur: "18s", delay: "1s" },
  { left: "74%", size: "text-4xl", dur: "24s", delay: "6s" },
  { left: "86%", size: "text-xl", dur: "15s", delay: "3s" },
  { left: "93%", size: "text-3xl", dur: "21s", delay: "9s" },
];

export default function FloatingPaws() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PAWS.map((p, i) => (
        <span
          key={i}
          className={`animate-drift absolute bottom-0 select-none text-white/30 ${p.size}`}
          style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}
        >
          🐾
        </span>
      ))}
    </div>
  );
}
