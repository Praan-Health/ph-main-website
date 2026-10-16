import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/careteam.css'
import './styles/helpstack.css'
import './styles/journey.css'
import './styles/pain.css'
import App from './App'
import { captureUtmParams } from './protocols/components/forms-pages/useUtmFields'

// Keep the landing page's UTM tags for the whole visit, so a form on any page carries them.
captureUtmParams()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
