import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { addLocale, locale, PrimeReactProvider } from "primereact/api";
import { all as locales } from "primelocale";
import { Toaster } from 'react-hot-toast';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./assets/css/index.css";
const localeKey = "pt_BR";

if (locales[localeKey]) {
  addLocale(localeKey, locales[localeKey]);
  locale(localeKey);
} else {
  console.warn(`Locale ${localeKey} não encontrado em primelocale.`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
