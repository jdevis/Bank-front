import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/assets/styles/index.scss'
import Home from '../src/pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Home />
    <Footer />
  </StrictMode>,
)
