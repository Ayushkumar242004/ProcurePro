// app/setLightTheme.tsx
"use client";

import { useEffect } from "react";

const SetLightTheme = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme");
      if (!currentTheme) {
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  return null;
};

export default SetLightTheme;
