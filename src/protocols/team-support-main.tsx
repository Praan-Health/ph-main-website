import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./globals.css";
import TeamSupportPage from "./TeamSupportPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TeamSupportPage />
  </StrictMode>,
);
