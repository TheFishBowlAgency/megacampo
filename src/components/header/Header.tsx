"use client";

import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!(header instanceof HTMLElement)) return;

    const syncOffset = () => {
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${header.offsetHeight}px`,
      );
    };

    syncOffset();
    const observer = new ResizeObserver(syncOffset);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <TopBar />
        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
