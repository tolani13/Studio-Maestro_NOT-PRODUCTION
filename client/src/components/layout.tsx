import { Link, useLocation } from "wouter";
import { Users, Music, Trophy, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/dancers", icon: Users, label: "Dancers" },
    { href: "/routines", icon: Music, label: "Routines" },
    { href: "/competitions", icon: Trophy, label: "Competitions" },
  ];

  const isActive = (href: string) => location.startsWith(href);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-primary">
                StudioSync
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-foreground/80 ${
                    isActive(item.href) ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 border-b bg-background/95 backdrop-blur flex items-center justify-between px-4 h-14">
        <span className="font-bold text-lg text-primary">StudioSync</span>
        {/* Placeholder for settings or user menu if needed */}
      </header>

      <main className="flex-1 container py-6 md:py-8 px-4 md:px-6 max-w-5xl mx-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50 flex justify-around items-center h-16 pb-safe">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex flex-col items-center justify-center w-16 h-full space-y-1 ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
