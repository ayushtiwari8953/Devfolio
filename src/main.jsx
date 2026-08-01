import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
    <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
  </HelmetProvider>,
)
