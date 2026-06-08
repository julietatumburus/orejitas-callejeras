import Link from "next/link";
import { ORG } from "@/lib/config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-pink-200 bg-pink-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-pink-700">
          <span className="text-2xl">🐾</span>
          {ORG.name}
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/#nosotros" className="hidden text-stone-600 hover:text-pink-600 sm:inline">
            Nosotros
          </Link>
          <Link href="/#ayudar" className="hidden text-stone-600 hover:text-pink-600 sm:inline">
            Cómo ayudar
          </Link>
          <Link
            href="/adoptar"
            className="rounded-full bg-pink-500 px-4 py-2 text-white shadow-sm transition hover:bg-pink-600"
          >
            Adoptar 🐶
          </Link>
        </div>
      </nav>
    </header>
  );
}
