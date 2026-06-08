import Link from "next/link";
import { getSettings } from "@/lib/settings";

export default async function Navbar() {
  const settings = await getSettings();
  return (
    <header className="sticky top-0 z-40 border-b border-rose-200 bg-[#fdf6ec]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-rose-800">
          <span className="text-2xl">🐾</span>
          {settings.name}
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/#nosotros" className="hidden text-stone-600 hover:text-rose-700 sm:inline">
            Nosotros
          </Link>
          <Link href="/#ayudar" className="hidden text-stone-600 hover:text-rose-700 sm:inline">
            Cómo ayudar
          </Link>
          <Link
            href="/adoptar"
            className="rounded-full bg-rose-700 px-4 py-2 text-white shadow-sm transition hover:bg-rose-800"
          >
            Adoptá 🐾
          </Link>
        </div>
      </nav>
    </header>
  );
}
