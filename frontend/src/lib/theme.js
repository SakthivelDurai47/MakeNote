import { useState, useEffect } from "react";

export function themeSetter() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "forest");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
}
