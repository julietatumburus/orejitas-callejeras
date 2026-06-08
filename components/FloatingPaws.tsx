/**
 * Decoración sutil: una huella grande animada en un lateral (y otra apenas
 * insinuada en la esquina opuesta). Pensado para que sea armónico, no recargado.
 */
export default function FloatingPaws({
  colorClass = "text-white/15",
}: {
  colorClass?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Huella grande, lateral izquierdo */}
      <span
        className={`animate-bob absolute -left-8 top-10 select-none text-[9rem] leading-none sm:text-[12rem] ${colorClass}`}
        style={{ animationDuration: "5s" }}
      >
        🐾
      </span>
      {/* Huella apenas insinuada, esquina opuesta */}
      <span
        className={`animate-bob absolute -right-6 bottom-6 select-none text-7xl leading-none ${colorClass}`}
        style={{ animationDuration: "6.5s", animationDelay: "1.2s" }}
      >
        🐾
      </span>
    </div>
  );
}
