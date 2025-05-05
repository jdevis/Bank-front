import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './services/store'
import '../src/assets/styles/index.scss'
import Home from '../src/pages/Home'
import User from './pages/User'
import Error from './pages/Error';
import Login from './components/Login';
import Header from './components/Header'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </Provider>
  </StrictMode>,
)
