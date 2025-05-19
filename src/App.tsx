import { useEffect } from "react";
// import FunnelView from "./components/funnel/funnel-view";
import Home from "./pages/Home";
import { useModeStore } from "./store/theme-mode/store";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const { isDarkMode } = useModeStore((state) => state);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty("--theme-color", "#0d0d0d");
      document.documentElement.style.setProperty("--bg-blank", "#333");
      document.documentElement.style.setProperty(
        "--funnel-theme-color",
        "#1A1A1A"
      );
      document.documentElement.style.setProperty("--theme-alter-color", "#FFF");
      document.documentElement.style.setProperty(
        "--theme-filter-color",
        "#151515"
      );
      document.documentElement.style.setProperty(
        "--dark-theme-color",
        "#0D0D0D"
      );
      document.documentElement.style.setProperty(
        "--filter-border-color",
        "#2E2F37"
      );
      document.documentElement.style.setProperty(
        "--theme-search-color",
        "#121212"
      );
      document.documentElement.style.setProperty(
        "--table-header-color",
        "#282828"
      );
      document.documentElement.style.setProperty(
        "--footer-theme-color",
        "#3B3B3B"
      );
      document.documentElement.style.setProperty(
        "--model-overlay-color",
        "#6d6d6d26"
      );
    } else {
      document.documentElement.style.setProperty("--theme-color", "white");
      document.documentElement.style.setProperty("--bg-blank", "#D9D9D9");
      document.documentElement.style.setProperty(
        "--funnel-theme-color",
        "#F2F2F2"
      );
      document.documentElement.style.setProperty("--theme-alter-color", "#000");
      document.documentElement.style.setProperty(
        "--theme-filter-color",
        "#F5F5F9"
      );
      document.documentElement.style.setProperty("--dark-theme-color", "#FFF");
      document.documentElement.style.setProperty(
        "--filter-border-color",
        "#D6D7DD"
      );
      document.documentElement.style.setProperty(
        "--theme-search-color",
        "#FAFAFA"
      );
      document.documentElement.style.setProperty(
        "--table-header-color",
        "#E4E4E4"
      );
      document.documentElement.style.setProperty(
        "--footer-theme-color",
        "#D1D1D1"
      );
      document.documentElement.style.setProperty(
        "--model-overlay-color",
        "#00000026"
      );
    }
  }, [isDarkMode]);

  return (
      <div className="relative flex flex-col min-h-screen">
        <main className="container mx-auto flex-1 bg-[var(--theme-color)] font-body">
          {/* <FunnelView /> */}
          <Home />
          <ScrollToTopButton />
        </main>
      </div>
  );
}

export default App;
