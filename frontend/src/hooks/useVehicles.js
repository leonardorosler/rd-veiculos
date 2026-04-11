import { useState, useEffect } from 'react'
import api from '../services/api'

export function useVehicles(filtros = {}) {
  const [veiculos, setVeiculos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const buscar = async () => {
      try {
        setCarregando(true)
        setErro(null)
        const { data } = await api.get('/veiculos', { params: filtros })
        setVeiculos(data)
      } catch (err) {
        setErro('Erro ao carregar veículos')
      } finally {
        setCarregando(false)
      }
    }

    buscar()
  }, [JSON.stringify(filtros)])

  return { veiculos, carregando, erro }
}