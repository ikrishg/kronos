"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-card border rounded-lg shadow-sm p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Authentication Error</h1>
          <p className="text-muted-foreground">
            {error === "Configuration"
              ? "There was a problem with the server configuration. Please try again later or contact support."
              : "An error occurred during authentication. Please try again."}
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">
              Try Again
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/50 backdrop-blur-sm w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/globe.svg"
              alt="Kronos Logo"
              width={24}
              height={24}
              className="opacity-80"
            />
            <h1 className="font-medium tracking-tight">Kronos</h1>
          </div>

          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-sm p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <p>Loading error details...</p>
            </div>
          </div>
        </div>
      }>
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}
