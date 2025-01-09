import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-phone-input-2/lib/style.css"; // Import default styles to build upon
import "react-datepicker/dist/react-datepicker.css";
import "@fontsource/poppins";
import "@fontsource/poppins/100.css"; // Thin
import "@fontsource/poppins/200.css"; // Extra Light
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // Semi Bold
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/poppins/800.css"; // Extra Bold
import "@fontsource/poppins/900.css"; // Black
import { ThemeProvider } from "./context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
