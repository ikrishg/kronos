import Link from "next/link";
import { Button } from "@/components/ui/button";
import KronosWordmark from "@/app/components/KronosWordmark";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="fixed z-10 w-full border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
          <KronosWordmark size="md" />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Time capsule
          </p>
          <h1 className="text-4xl font-normal leading-[1.05] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Preserve moments.
            <br />
            Open them later.
          </h1>
          <p className="mt-6 max-w-md text-base text-body-secondary">
            Seal memories now and rediscover them when the time is right.
          </p>
          <Link href="/login" className="mt-10">
            <Button size="lg">Sign in with Google</Button>
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6">
          <KronosWordmark size="sm" asLink={false} />
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kronos
          </p>
        </div>
      </footer>
    </div>
  );
}
