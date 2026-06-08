/** Patitas 🐾 que flotan hacia arriba de fondo (decorativo, animación CSS). */
// Posicionadas hacia los costados para dejar el centro (texto) despejado.
const PAWS = [
  // costado izquierdo
  { left: "3%", size: "text-2xl", dur: "18s", delay: "0s" },
  { left: "9%", size: "text-4xl", dur: "24s", delay: "5s" },
  { left: "16%", size: "text-xl", dur: "16s", delay: "2s" },
  { left: "22%", size: "text-3xl", dur: "22s", delay: "8s" },
  // costado derecho
  { left: "78%", size: "text-3xl", dur: "20s", delay: "1s" },
  { left: "85%", size: "text-xl", dur: "26s", delay: "6s" },
  { left: "91%", size: "text-4xl", dur: "17s", delay: "3s" },
  { left: "97%", size: "text-2xl", dur: "23s", delay: "9s" },
];

export default function FloatingPaws({
  colorClass = "text-rose-200/70",
}: {
  colorClass?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PAWS.map((p, i) => (
        <span
          key={i}
          className={`animate-drift absolute bottom-0 select-none ${colorClass} ${p.size}`}
          style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}
        >
          🐾
        </span>
      ))}
    </div>
  );
}
