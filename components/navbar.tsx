"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import Logo from "./logo";

const navLinks = [
  {
    name: "Features",
    href: "/",
  },
  {
    name: "Pricing",
    href: "/about",
  },
  {
    name: "About",
    href: "/services",
  },
  {
    name: "Support",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex justify-between items-center w-full">
          {/* LOGO */}
          <Logo />
          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-1">
            <Link href="/auth/login">
              <Button className="cursor-pointer" variant="ghost">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="cursor-pointer">Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="ml-2">
          <ThemeToggle />
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="ml-1 cursor-pointer"
                variant="ghost"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <div className="mt-8 px-12 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="flex flex-col gap-1">
                  <Button className="cursor-pointer" variant="ghost">
                    Login
                  </Button>
                  <Button className="cursor-pointer">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
