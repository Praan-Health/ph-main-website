import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./globals.css";
import RefundPolicyPage from "./RefundPolicyPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RefundPolicyPage />
  </StrictMode>,
);
