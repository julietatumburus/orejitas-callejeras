import { whatsappGeneralLink } from "@/lib/config";
import { getSettings } from "@/lib/settings";

const circle =
  "grid h-12 w-12 place-items-center rounded-full text-white shadow-md transition group-hover:scale-110 group-hover:shadow-lg";
const item = "group flex flex-col items-center gap-1.5";
const label = "text-xs font-medium text-stone-500 group-hover:text-stone-700";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="mt-auto border-t border-pink-200 bg-gradient-to-b from-[#fdf6ec] to-[#f1ddcf]/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-12 text-center">
        <p className="flex items-center gap-2 text-lg font-bold text-pink-800">
          <span className="text-2xl">🐾</span> {settings.name}
        </p>

        <div className="flex flex-wrap items-start justify-center gap-7">
          {/* WhatsApp */}
          {settings.whatsapp && (
            <a
              href={whatsappGeneralLink(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={item}
            >
              <span className={`${circle} bg-[#25D366]`}>
                <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.7L.5 31.5l8-2.1c2.2 1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5C3.9 20.5 3.2 18.3 3.2 16 3.2 8.9 8.9 3.2 16 3.2 23.1 3.2 28.8 8.9 28.8 16S23.1 28.5 16 28.5zm7.4-9.6c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.2-.7-.4z" />
                </svg>
              </span>
              <span className={label}>WhatsApp</span>
            </a>
          )}

          {/* Instagram */}
          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={item}
            >
              <span
                className={`${circle} bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-white"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.1" className="fill-white stroke-none" />
                </svg>
              </span>
              <span className={label}>Instagram</span>
            </a>
          )}

          {/* Email */}
          {settings.email && (
            <a href={`mailto:${settings.email}`} aria-label="Email" className={item}>
              <span className={`${circle} bg-gradient-to-tr from-pink-500 to-pink-400`}>
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
              </span>
              <span className={label}>Email</span>
            </a>
          )}

          {/* Facebook */}
          {settings.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={item}
            >
              <span className={`${circle} bg-[#1877F2]`}>
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.26-1.55 1.57-1.55h1.67V4.27c-.29-.04-1.28-.13-2.44-.13-2.42 0-4.07 1.48-4.07 4.19v2.34H7.5V14h2.7v8h3.3Z" />
                </svg>
              </span>
              <span className={label}>Facebook</span>
            </a>
          )}
        </div>

        <div className="mt-2 h-px w-24 bg-pink-200" />
        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} {settings.name} · Organización sin fines de lucro 🐾
        </p>
      </div>
    </footer>
  );
}
