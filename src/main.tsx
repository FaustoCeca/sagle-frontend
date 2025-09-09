import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SagleApp from './SagleApp'
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SagleApp />
  </StrictMode>,
)
