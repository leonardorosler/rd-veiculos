import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function RotaProtegida({ children }) {
  const { admin } = useAuth()
  if (!admin) return <Navigate to="/painel-interno" replace />
  return children
}