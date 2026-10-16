import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./globals.css";
import ConditionsIndexPage from "./ConditionsIndexPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConditionsIndexPage />
  </StrictMode>,
);
