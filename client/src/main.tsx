import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Web Fonts
const geizerFontStyle = document.createElement('style');
geizerFontStyle.textContent = `
  @font-face {
    font-family: 'Geizer';
    src: url('https://fonts.cdnfonts.com/css/geizer') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;
document.head.appendChild(geizerFontStyle);

// Add page title and metadata
document.title = "Alluraiah Sweets | Authentic Indian Sweets & Namkeens";

// Add favicon
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍬</text></svg>';
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);
