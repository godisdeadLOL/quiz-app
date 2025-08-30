import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./global.css";

createRoot(document.getElementById("root")!).render(<App />);
