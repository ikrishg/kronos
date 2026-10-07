import Link from "next/link";
import KronosWordmark from "@/app/components/KronosWordmark";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <KronosWordmark className="mb-8" />
        <h1 className="text-2xl font-normal tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-body-secondary">
          Kronos is a time-capsule social product. By using the service you agree to use it
          responsibly and not to upload unlawful content. These terms are a placeholder until
          full legal copy is published.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
