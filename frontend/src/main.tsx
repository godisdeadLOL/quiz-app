import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./global.css";
import "@fontsource/inter";

createRoot(document.getElementById("root")!).render(<App />);
