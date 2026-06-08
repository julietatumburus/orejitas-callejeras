import { ORG, whatsappGeneralLink } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-pink-200 bg-pink-100/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-stone-600">
        <p className="text-base font-semibold text-pink-700">🐾 {ORG.name}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={whatsappGeneralLink()} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            WhatsApp
          </a>
          {ORG.email && (
            <a href={`mailto:${ORG.email}`} className="hover:text-pink-600">
              {ORG.email}
            </a>
          )}
          {ORG.instagram && (
            <a href={ORG.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
              Instagram
            </a>
          )}
          {ORG.facebook && (
            <a href={ORG.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
              Facebook
            </a>
          )}
        </div>
        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} {ORG.name}. Organización sin fines de lucro.
        </p>
      </div>
    </footer>
  );
}
