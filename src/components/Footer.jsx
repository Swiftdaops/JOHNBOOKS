
import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";

function Footer() {
	const { theme } = useTheme();
	const [resolvedTheme, setResolvedTheme] = useState("light");

	useEffect(() => {
		if (theme === "system") {
			const mq = window.matchMedia("(prefers-color-scheme: dark)");
			const update = (e) => setResolvedTheme(e.matches ? "dark" : "light");
			setResolvedTheme(mq.matches ? "dark" : "light");
			if (mq.addEventListener) mq.addEventListener("change", update);
			else mq.addListener(update);
			return () => {
				if (mq.removeEventListener) mq.removeEventListener("change", update);
				else mq.removeListener(update);
			};
		}

		setResolvedTheme(theme);
	}, [theme]);

	const base = "mx-auto border-t w-full py-4 text-center text-sm";
	const themeClass = resolvedTheme === "dark" ? "darkglass text-white" : "card text-stone-950";

	return (
		<footer className={`${base} ${themeClass}`}>
			© {new Date().getFullYear()} JOHNBOOKS — Rare Books for Nigeria.
		</footer>
	);
}

export default Footer;

