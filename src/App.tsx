import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";
import NewsletterModal from "./components/NewsletterModal";

import { ThemeProvider } from "./contexts/theme";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const isDark = localStorage.getItem("darkMode");
    return isDark === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());

    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (darkMode) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <ThemeProvider value={{ darkMode, toggleDarkMode }}>
      <NewsletterModal />
      <Navbar />
      <NewsSection />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
