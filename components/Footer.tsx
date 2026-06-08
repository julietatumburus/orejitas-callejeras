import { whatsappGeneralLink } from "@/lib/config";
import { getSettings } from "@/lib/settings";

const pill =
  "inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="mt-auto border-t border-pink-200 bg-pink-100/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-10 text-center">
        <p className="flex items-center gap-2 text-base font-semibold text-pink-700">
          <span className="text-xl">🐾</span> {settings.name}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* WhatsApp */}
          {settings.whatsapp && (
            <a
              href={whatsappGeneralLink(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} hover:border-green-300 hover:text-green-700`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-green-600" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.52 11.97c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
              </svg>
              WhatsApp
            </a>
          )}

          {/* Email */}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className={`${pill} hover:border-pink-300`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-pink-600" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Email
            </a>
          )}

          {/* Instagram */}
          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} hover:border-fuchsia-300 hover:text-fuchsia-700`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-fuchsia-600" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" className="fill-fuchsia-600 stroke-none" />
              </svg>
              Instagram
            </a>
          )}

          {/* Facebook */}
          {settings.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} hover:border-blue-300 hover:text-blue-700`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-blue-600" aria-hidden="true">
                <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.26-1.55 1.57-1.55h1.67V4.27c-.29-.04-1.28-.13-2.44-.13-2.42 0-4.07 1.48-4.07 4.19v2.34H7.5V14h2.7v8h3.3Z" />
              </svg>
              Facebook
            </a>
          )}
        </div>

        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} {settings.name}. Organización sin fines de lucro.
        </p>
      </div>
    </footer>
  );
}
