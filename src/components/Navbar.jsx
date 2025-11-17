 
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle.jsx";

function Navbar() {
        const { theme } = useTheme();
    const [resolvedTheme, setResolvedTheme] = useState("light");

    useEffect(() => {
        if (theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const update = (e) => setResolvedTheme(e.matches ? "dark" : "light");
            // set initial
            setResolvedTheme(mq.matches ? "dark" : "light");
            // listen for changes
            if (mq.addEventListener) mq.addEventListener("change", update);
            else mq.addListener(update);
            return () => {
                if (mq.removeEventListener) mq.removeEventListener("change", update);
                else mq.removeListener(update);
            };
        }

        setResolvedTheme(theme);
    }, [theme]);

    const darkLogo = "https://res.cloudinary.com/dnitzkowt/image/upload/v1763331609/ChatGPT_Image_Nov_16__2025__08_45_35_PM-removebg-preview_mjh5ye.png";
    const lightLogo = "https://res.cloudinary.com/dnitzkowt/image/upload/v1763331618/ChatGPT_Image_Nov_16__2025__07_00_44_PM-removebg-preview_idhs4n.png";
    const logoSrc = resolvedTheme === "dark" ? darkLogo : lightLogo;
    // Backwards-compatible alias: some hot-reloaded modules may still reference `logo`
    const logo = logoSrc;

    const navBase = "sticky top-0 z-30 border-b backdrop-blur-md";
    const navThemeClass = resolvedTheme === "dark" ? "darkglass text-white" : "card text-stone-950";
    const navClassName = `${navBase} ${navThemeClass}`;

return (
    <nav className={navClassName}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <img
                    src={logoSrc}
                    alt="JOHNBOOKS logo"
                    className="h-8 w-8 object-contain rounded"
                />
                <span className="text-base  font-bold tracking-tight">
                    JOHNBOOKS
                </span>
            </div>

            <div className="flex items-center gap-3">
                <ModeToggle />
            </div>
        </div>

        
    </nav>
);
}

export default Navbar;
