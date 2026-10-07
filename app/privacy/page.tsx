import Link from "next/link";
import KronosWordmark from "@/app/components/KronosWordmark";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <KronosWordmark className="mb-8" />
        <h1 className="text-2xl font-normal tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-body-secondary">
          We use Google sign-in to authenticate you. Capsule content and delivery dates are stored
          to operate the product. This policy is a placeholder until full legal copy is published.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
