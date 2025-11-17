import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BooksPage from "./components/books/BooksPage";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900 dark:text-white">
        <Navbar />
        <BooksPage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
