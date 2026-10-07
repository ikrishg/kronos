"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import KronosWordmark from "@/app/components/KronosWordmark";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full border border-[rgba(255,255,255,0.25)] p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-normal tracking-tight">
            Couldn&apos;t sign in
          </h1>
          <p className="text-muted-foreground">
            {error === "Configuration"
              ? "There was a problem with the server configuration. Try again later."
              : "Something went wrong during sign-in. Try again."}
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/login">Try again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/">Return to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="w-full border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <KronosWordmark size="md" />
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center px-6">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        }
      >
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}
