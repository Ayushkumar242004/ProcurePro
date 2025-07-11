// app/SetLightTheme.tsx
"use client";

import { useEffect } from "react";

const SetLightTheme = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return null;
};

export default SetLightTheme;
