import { useState } from "react";

function ThemeSelector() {
  const userTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(userTheme ? userTheme : "forest");
  return (
    <div>
      <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn btn-ghost text-primary">
          Theme
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="inline-block h-2 w-2 fill-current opacity-60"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          </svg>
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
