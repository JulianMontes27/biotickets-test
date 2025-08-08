"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-slate-900 font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-white">Event Pass</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-300 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-slate-300 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/events" 
              className="text-slate-300 hover:text-primary transition-colors font-medium"
            >
              Event
            </Link>
            <Link 
              href="/blog" 
              className="text-slate-300 hover:text-primary transition-colors font-medium"
            >
              Bloqy
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:text-white hover:border-primary">
              Log in
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-300 hover:text-primary transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 border-t border-slate-800/50">
              <Link 
                href="/" 
                className="block px-3 py-2 text-slate-300 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-slate-300 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className="block px-3 py-2 text-slate-300 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Event
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 text-slate-300 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Bloqy
              </Link>
              <div className="px-3 py-2">
                <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 hover:text-white hover:border-primary">
                  Log in
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}