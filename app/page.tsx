"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Home() {
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial state - everything invisible
    gsap.set([logoRef.current, headingRef.current, descRef.current, buttonRef.current, formRef.current], { 
      autoAlpha: 0,
    });
    
    // Animate elements in sequence
    tl.fromTo(logoRef.current, 
      { scale: 0.5, y: -30 }, 
      { duration: 1.2, scale: 1, y: 0, autoAlpha: 1 }
    )
    .fromTo(headingRef.current, 
      { y: 20 }, 
      { duration: 0.8, y: 0, autoAlpha: 1 }, 
      "-=0.6"
    )
    .fromTo(descRef.current, 
      { y: 20 }, 
      { duration: 0.8, y: 0, autoAlpha: 1 }, 
      "-=0.6"
    )
    .fromTo(formRef.current, 
      { y: 30 }, 
      { duration: 0.8, y: 0, autoAlpha: 1 }, 
      "-=0.5"
    )
    .fromTo(buttonRef.current, 
      { scale: 0.9 }, 
      { duration: 0.6, scale: 1, autoAlpha: 1 }, 
      "-=0.3"
    );
    
    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <header className="border-b bg-background/50 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2" ref={logoRef}>
            <Image
              src="/globe.svg"
              alt="Kronos Logo"
              width={28}
              height={28}
              className="opacity-90"
            />
            <h1 className="font-medium tracking-tight">Kronos</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center pt-20 px-4">
        <div className="max-w-md w-full mx-auto bg-card border rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6">
              <Image
                src="/globe.svg"
                alt="Kronos Logo"
                width={64}
                height={64}
                className="opacity-80"
                ref={logoRef}
              />
            </div>
            <h1 
              className="text-3xl md:text-4xl font-medium mb-4 tracking-tight"
              ref={headingRef}
            >
              Welcome to Kronos
            </h1>
            <p 
              className="text-md text-muted-foreground mb-0"
              ref={descRef}
            >
              A time capsule for your memories
            </p>
          </div>
          
          <div className="space-y-4" ref={formRef}>
            <p className="text-center text-muted-foreground mb-4">
              Preserve moments now, rediscover them when you need them most.
            </p>
            
            <Link href="/login" className="block w-full">
              <Button 
                size="lg" 
                className="rounded-md px-6 w-full"
                ref={buttonRef}
              >
                Sign in with Google
              </Button>
            </Link>
            
            <div className="text-xs text-center text-muted-foreground mt-6">
              By signing in, you agree to our Terms of Service & Privacy Policy
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 border-t mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center gap-2 opacity-70">
              <Image
                src="/globe.svg"
                alt="Kronos Logo"
                width={16}
                height={16}
              />
              <span className="text-sm font-medium">Kronos</span>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Kronos · CD Doon
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
