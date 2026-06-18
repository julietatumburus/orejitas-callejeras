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
        <p className="text-lg font-bold text-pink-800">{settings.name}</p>

        <div className="flex flex-wrap items-start justify-center gap-7">
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
          © {new Date().getFullYear()} {settings.name} · Organización sin fines de lucro
        </p>
      </div>
    </footer>
  );
}
