import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {registerLibrary, getLibraries} from "./index";
import * as SimpleIcons from "@icons-pack/react-simple-icons";

registerLibrary({
  id: "simple-icons",
  name: "Simple Icons",
  load: async () => {
    return Object.entries(SimpleIcons)
      .filter(([name]) => name.startsWith("Si") && !name.endsWith("Hex"))
      .map(([exportName, component]) => {

        return {
          id: `simple-icons--${exportName}`,
          name: exportName.replace(/^Si/, ""),
          component: component,
          library: "simple-icons",
          color: SimpleIcons[`${exportName}Hex`] || "currentColor",
        }
      })
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
