import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BooksPage from "./components/books/BooksPage";
import Footer from "./components/Footer";
// ThemeProvider removed — app uses a single visual theme

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-stone-900">
      <Navbar />
      <BooksPage />
      <Footer />
    </div>
  );
}

export default App;
