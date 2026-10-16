import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./globals.css";
import ConditionPage from "./ConditionPage";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <ConditionPage slug={root.dataset.condition ?? ""} />
  </StrictMode>,
);
