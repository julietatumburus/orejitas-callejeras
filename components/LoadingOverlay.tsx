"use client";

/** Pantalla de carga a pantalla completa (spinner) mientras se procesa/redirige. */
export default function LoadingOverlay({ show, text }: { show: boolean; text?: string }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#fdf6ec]/85 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500" />
      <p className="text-sm font-semibold text-pink-700">{text ?? "Cargando…"}</p>
    </div>
  );
}
