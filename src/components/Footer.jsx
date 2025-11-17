
import React from "react";

function Footer() {
  const base = "mx-auto border-t w-full py-4 text-center text-sm";
  const themeClass = "card text-stone-950";

  return (
    <footer className={`${base} ${themeClass}`}>
      © {new Date().getFullYear()} JOHNBOOKS — Rare Books for Nigeria.
    </footer>
  );
}

export default Footer;

