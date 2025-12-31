import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BandProvider } from "./context/BandContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BandProvider>
      <App />
    </BandProvider>
  </StrictMode>,
)
