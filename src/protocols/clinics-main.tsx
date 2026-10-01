import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./globals.css";
import ClinicsPage from "./ClinicsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClinicsPage />
  </StrictMode>,
);
