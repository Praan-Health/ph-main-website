import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./globals.css";
import ProtocolsPage from "./Page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProtocolsPage />
  </StrictMode>,
);
