import { requireManager } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import AdminNav from "../AdminNav";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const me = await requireManager();
  const settings = await getSettings();

  return (
    <div className="flex min-h-full flex-col">
      <AdminNav role={me.role} email={me.email} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="mb-1 text-2xl font-bold text-pink-600">Configuración</h1>
        <p className="mb-6 text-sm text-stone-500">
          Esto es lo que se muestra en la web pública (inicio y footer).
        </p>
        <SettingsForm settings={settings} />
      </main>
    </div>
  );
}
