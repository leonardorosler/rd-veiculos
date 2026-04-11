import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import RotaProtegida from './components/RotaProtegida/RotaProtegida'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import VehicleDetail from './pages/VehicleDetail/VehicleDetail'
import Sobre from './pages/Sobre/Sobre'
import Login from './pages/Admin/Login/Login'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import VehicleForm from './pages/Admin/VehicleForm/VehicleForm'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/veiculo/:id" element={<Layout><VehicleDetail /></Layout>} />
          <Route path="/sobre" element={<Layout><Sobre /></Layout>} />

          <Route path="/painel-interno" element={<Login />} />
          <Route path="/painel-interno/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
          <Route path="/painel-interno/veiculos/novo" element={<RotaProtegida><VehicleForm /></RotaProtegida>} />
          <Route path="/painel-interno/veiculos/:id/editar" element={<RotaProtegida><VehicleForm /></RotaProtegida>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}