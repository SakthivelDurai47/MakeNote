import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

function ThemeSelector() {
  const userTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(userTheme ? userTheme : "forest");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <div className="dropdown dropdown-end ">
        <div tabIndex={0} role="button" className="btn btn-ghost text-primary">
          <span className="hidden sm:inline">Theme</span>
          <Palette className="size-4" />
        </div>

        <div
          tabIndex={-1}
          className="dropdown-content bg-base-300 rounded-box z-1 w-56 p-2 shadow-2xl"
        >
          <div className="join join-vertical w-full">
            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item rounded-t-sm justify-start text-sm"
              aria-label="Forest (Default)"
              value="forest"
              checked={theme === "forest"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start text-sm"
              aria-label="Halloween"
              value="halloween"
              checked={theme === "halloween"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start text-sm"
              aria-label="Dark"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start text-sm"
              aria-label="Light"
              value="light"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start text-sm"
              aria-label="Nord"
              value="nord"
              checked={theme === "nord"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start text-sm"
              aria-label="Corporate"
              value="corporate"
              checked={theme === "corporate"}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;
