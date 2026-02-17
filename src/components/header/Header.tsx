"use client";

import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TopBar />
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
