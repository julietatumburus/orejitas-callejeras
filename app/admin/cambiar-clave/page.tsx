import { redirect } from "next/navigation";
import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { ORG } from "@/lib/config";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function CambiarClavePage() {
  const profile = await getProfile();
  if (!profile) redirect("/admin/login");
  if (!profile.must_change_password) redirect("/admin");

  const expired = profile.temp_password_expires_at
    ? new Date(profile.temp_password_expires_at) < new Date()
    : false;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-pink-200 bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 block text-center text-lg font-bold text-pink-600">
          {ORG.name}
        </Link>
        <ChangePasswordForm expired={expired} />
      </div>
    </main>
  );
}
