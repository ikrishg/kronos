import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/50 backdrop-blur-sm fixed w-full z-10">
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

          <div className="hidden md:flex space-x-6">
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          <Button variant="outline" size="sm" className="rounded-full">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center pt-16 px-4" id="about">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 opacity-80">
              <Image
                src="/globe.svg"
                alt="Kronos Logo"
                width={64}
                height={64}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight">
              A time capsule for your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">memories</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10"></span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Kronos is a digital time capsule for CD Doon. Preserve moments
              now, rediscover them when you need them most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-6">
                Create Your Capsule
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Image
                src="/window.svg"
                alt="Background"
                width={500}
                height={300}
                className="object-contain"
              />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-10">
                <Image
                  src="/file.svg"
                  alt="Time Capsule"
                  width={40}
                  height={40}
                  className="opacity-80"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-lg font-medium mb-2">Capture</h3>
                  <p className="text-muted-foreground text-sm">
                    Save photos, thoughts, and media that matter.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Preserve</h3>
                  <p className="text-muted-foreground text-sm">
                    Seal it away for your future self to discover.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Rediscover</h3>
                  <p className="text-muted-foreground text-sm">
                    Experience the joy of memories when they unlock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30" id="features">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three simple steps to preserve your most precious memories for the
              future
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="h-16 w-16 rounded-full border flex items-center justify-center">
                  <span className="text-foreground/80 text-xl">01</span>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-xl font-medium mb-2">
                  Create your collection
                </h3>
                <p className="text-muted-foreground">
                  Gather photos, videos, messages, and thoughts you want to
                  preserve. Kronos accepts all digital formats to ensure your
                  memories last.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex justify-center md:order-last">
                <div className="h-16 w-16 rounded-full border flex items-center justify-center">
                  <span className="text-foreground/80 text-xl">02</span>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-center md:text-right">
                <h3 className="text-xl font-medium mb-2">Set your timeline</h3>
                <p className="text-muted-foreground">
                  Choose when your capsule will unlock. Whether it&apos;s next
                  year or decades from now, Kronos will keep your memories
                  secure until then.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="h-16 w-16 rounded-full border flex items-center justify-center">
                  <span className="text-foreground/80 text-xl">03</span>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-xl font-medium mb-2">Rediscover later</h3>
                <p className="text-muted-foreground">
                  When the time comes, receive a notification to unlock your
                  capsule. Revisit memories exactly when they&apos;ll mean the
                  most to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              Set your timeline
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Choose when you want to unlock your memories
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <Progress value={25} className="h-1 mb-4" />

            <div className="flex justify-between text-sm mb-12 text-muted-foreground">
              <span>Today</span>
              <span>Waiting</span>
              <span>Unlock Day</span>
            </div>

            <div className="bg-muted/30 p-8 rounded-lg">
              <div className="mb-6">
                <Label htmlFor="unlock-date" className="mb-3 block text-sm">
                  When would you like to unlock your capsule?
                </Label>
                <div className="space-y-4">
                  <ToggleGroup type="single" className="justify-center w-full">
                    <ToggleGroupItem value="1year" className="flex-1">
                      1 Year
                    </ToggleGroupItem>
                    <ToggleGroupItem value="5years" className="flex-1">
                      5 Years
                    </ToggleGroupItem>
                    <ToggleGroupItem value="10years" className="flex-1">
                      10 Years
                    </ToggleGroupItem>
                    <ToggleGroupItem value="custom" className="flex-1">
                      Custom
                    </ToggleGroupItem>
                  </ToggleGroup>

                  <Input
                    id="unlock-date"
                    type="date"
                    className="w-full"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <Button className="w-full rounded-full">Set Unlock Date</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-28 bg-muted/30" id="contact">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="mb-6">
            <Image
              src="/file.svg"
              alt="Time Capsule"
              width={36}
              height={36}
              className="mx-auto opacity-70"
            />
          </div>
          <h2 className="text-3xl font-medium tracking-tight mb-4">
            Start preserving today
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            Create your digital time capsule and save memories for your future
            self
          </p>
          <Button size="lg" className="rounded-full px-8">
            Create Your Capsule
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t mt-auto">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0 opacity-80">
              <Image
                src="/globe.svg"
                alt="Kronos Logo"
                width={20}
                height={20}
              />
              <span className="text-sm">Kronos</span>
            </div>

            <div className="flex gap-8 mb-6 md:mb-0">
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Kronos · CD Doon
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
