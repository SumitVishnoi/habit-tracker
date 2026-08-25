import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import AuthProvider from './features/auth/context/AuthProvider'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
