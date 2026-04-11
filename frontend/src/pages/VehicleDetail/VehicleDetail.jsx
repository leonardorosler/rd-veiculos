import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import './VehicleDetail.css'

export default function VehicleDetail() {
    const { id } = useParams()
    const [veiculo, setVeiculo] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [imagemAtiva, setImagemAtiva] = useState(0)

    useEffect(() => {
        api.get(`/veiculos/${id}`)
            .then(res => setVeiculo(res.data))
            .catch(() => setVeiculo(null))
            .finally(() => setCarregando(false))
    }, [id])

    if (carregando) {
        return (
            <div className="pagina container detalhe__loading">
                <div className="home__spinner" />
            </div>
        )
    }

    if (!veiculo) {
        return (
            <div className="pagina container detalhe__nao-encontrado">
                <p>Veículo não encontrado.</p>
                <Link to="/">Voltar ao estoque</Link>
            </div>
        )
    }

    const whatsappNumero = import.meta.env.VITE_WHATSAPP || '5500000000000'
    const mensagem = encodeURIComponent(
        `Olá! Tenho interesse no veículo: *${veiculo.titulo}* (${veiculo.ano}) — R$ ${veiculo.preco.toLocaleString('pt-BR')}. Ainda está disponível?`
    )
    const linkWhatsApp = `https://wa.me/${whatsappNumero}?text=${mensagem}`

    const precoFormatado = veiculo.preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    })

    const itens = [
        { label: 'Marca', valor: veiculo.marca },
        { label: 'Modelo', valor: veiculo.modelo },
        { label: 'Ano', valor: veiculo.ano },
        { label: 'Cor', valor: veiculo.cor },
        { label: 'Combustível', valor: veiculo.combustivel },
        { label: 'Tipo', valor: veiculo.tipo },
        { label: 'Quilometragem', valor: `${veiculo.quilometragem.toLocaleString('pt-BR')} km` },
    ]

    return (
        <div className="pagina container">
            <Link to="/" className="detalhe__voltar">← Voltar ao estoque</Link>

            <div className="detalhe__layout">

                {/* Galeria */}
                <div className="detalhe__galeria">
                    <div className="detalhe__imagem-principal">
                        {veiculo.imagens.length > 0 ? (
                            <img
                                src={veiculo.imagens[imagemAtiva]?.url}
                                alt={veiculo.titulo}
                            />
                        ) : (
                            <div className="detalhe__sem-imagem">Sem fotos</div>
                        )}
                        {veiculo.vendido && (
                            <span className="detalhe__vendido-badge">Vendido</span>
                        )}
                    </div>

                    {veiculo.imagens.length > 1 && (
                        <div className="detalhe__thumbnails">
                            {veiculo.imagens.map((img, i) => (
                                <button
                                    key={img.id}
                                    className={`detalhe__thumb ${i === imagemAtiva ? 'ativo' : ''}`}
                                    onClick={() => setImagemAtiva(i)}
                                >
                                    <img src={img.url} alt={`Foto ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="detalhe__info">
                    <p className="detalhe__marca">{veiculo.marca} · {veiculo.ano}</p>
                    <h1 className="detalhe__titulo">{veiculo.titulo}</h1>
                    <p className="detalhe__preco">{precoFormatado}</p>

                    <div className="detalhe__specs">
                        {itens.map(item => (
                            <div key={item.label} className="detalhe__spec">
                                <span className="detalhe__spec-label">{item.label}</span>
                                <span className="detalhe__spec-valor">{item.valor}</span>
                            </div>
                        ))}
                    </div>

                    {veiculo.descricao && (
                        <div className="detalhe__descricao">
                            <p className="detalhe__descricao-titulo">Descrição</p>
                            <p>{veiculo.descricao}</p>
                        </div>
                    )}

                    {!veiculo.vendido ? (
                        <a
                            href={linkWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detalhe__btn-whatsapp"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.727.887.918-3.618-.235-.372A9.818 9.818 0 112 12c0-5.423 4.395-9.818 9.818-9.818 5.424 0 9.819 4.395 9.819 9.818 0 5.424-4.395 9.818-9.819 9.818z" />
                            </svg>
                            Tenho interesse — chamar no WhatsApp
                        </a>
                    ) : (
                        <div className="detalhe__vendido-info">
                            Este veículo já foi vendido.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}