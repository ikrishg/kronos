import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarTrigger 
} from "@/components/ui/menubar";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/globe.svg" alt="Kronos Logo" width={32} height={32} />
            <h1 className="text-xl font-bold">Kronos</h1>
          </div>
          
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>About</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>WTF is this?</MenubarItem>
                <MenubarItem>How It Works</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Features</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Digital Time Capsule</MenubarItem>
                <MenubarItem>Memory Preservation</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Contact</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
          
          <Button variant="outline">Sign In</Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 flex flex-col items-center text-center px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Preserve Your Moments for the Future</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kronos is a time capsule made for CD Doon, allowing you to store memories, messages, and media for your future self.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Create Your Capsule</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Image src="/window.svg" alt="Background" width={600} height={400} className="object-contain" />
            </div>
            <div className="bg-card rounded-lg p-8 border relative z-10 shadow-lg">
              <Image src="/file.svg" alt="Time Capsule" width={60} height={60} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Your Digital Legacy</h3>
              <p className="text-muted-foreground mb-6">
                Store photos, videos, messages, and more in a secure digital vault that can be opened at a future date.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Kronos Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create</h3>
              <p className="text-muted-foreground">
                Build your time capsule by adding photos, videos, messages, and memories.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Preserve</h3>
              <p className="text-muted-foreground">
                Set a future date when your capsule will be unlocked and available.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p className="text-muted-foreground">
                Experience the joy of rediscovering memories when your capsule unlocks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Journey Through Time</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Track your time capsule's journey from creation to revelation
          </p>
          
          <div className="max-w-2xl mx-auto">
            <Progress value={33} className="h-2 mb-4" />
            
            <div className="flex justify-between text-sm">
              <span>Created</span>
              <span>Waiting</span>
              <span>Unlocked</span>
            </div>
            
            <div className="mt-8">
              <Label htmlFor="unlock-date" className="mb-2 block">Set unlock date</Label>
              <div className="flex gap-4">
                <Input id="unlock-date" type="date" />
                <Button>Set Date</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-t from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Time Capsule Today</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create f
          </p>
          <Button size="lg" className="font-medium">
            Create Your Capsule
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card py-12 border-t mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Image src="/globe.svg" alt="Kronos Logo" width={24} height={24} />
              <h2 className="font-bold">Kronos</h2>
            </div>
            
            <div className="flex gap-6 mb-6 md:mb-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">About</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kronos - CD Doon
            </div>
          </div>
        </div>
      </footer>
    </div>
	);
}
