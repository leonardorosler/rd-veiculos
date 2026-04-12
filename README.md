# 🚗 RD Veículos & Financiamentos

> Sistema completo de revenda de veículos com catálogo público, painel administrativo e integração com WhatsApp.

![Status](https://img.shields.io/badge/status-em%20produção-brightgreen)
![Node](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?logo=supabase&logoColor=white)

---

## 📋 Sobre o Projeto

A **RD Veículos** é uma plataforma fullstack desenvolvida para revendas de veículos seminovos. O sistema oferece uma vitrine pública profissional para exibição do catálogo e um painel administrativo completo para gerenciamento do estoque — acessível apenas por URL não divulgada.

### Funcionalidades principais

**Área Pública**
- Catálogo de veículos com filtros avançados (marca, modelo, tipo, ano, preço, quilometragem)
- Página de detalhes com galeria de imagens e troca de fotos por thumbnail
- Botão de contato via WhatsApp com mensagem dinâmica baseada no veículo
- Página "Sobre Nós" com diferenciais, contato, horários e mapa
- Layout responsivo — mobile first

**Área Administrativa** *(acesso restrito)*
- Autenticação JWT com rate limiting (proteção contra força bruta)
- CRUD completo de veículos
- Upload de múltiplas imagens com preview
- Marcar veículo como vendido
- Remoção de imagens individuais

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite + CSS Puro |
| Backend | Node.js + Express 5 |
| ORM | Prisma 7 (com driver adapter PrismaPg) |
| Banco de dados | PostgreSQL via Supabase |
| Storage de imagens | Supabase Storage |
| Autenticação | JWT + bcryptjs |
| Deploy frontend | Vercel |
| Deploy backend | Render |

---

## 🏗️ Arquitetura

```
garagem/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── vehicle.controller.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── vehicle.service.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── vehicle.routes.js
│   │   │   └── index.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── utils/
│   │   │   ├── prisma.js
│   │   │   └── supabase.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar/
    │   │   ├── Hero/
    │   │   ├── Filter/
    │   │   ├── VehicleCard/
    │   │   ├── SobrePreview/
    │   │   ├── Footer/
    │   │   └── RotaProtegida/
    │   ├── pages/
    │   │   ├── Home/
    │   │   ├── VehicleDetail/
    │   │   ├── Sobre/
    │   │   └── Admin/
    │   │       ├── Login/
    │   │       ├── Dashboard/
    │   │       └── VehicleForm/
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useVehicles.js
    │   ├── services/
    │   │   └── api.js
    │   └── styles/
    │       ├── global.css
    │       └── variables.css
    └── package.json
```

---

## 🔌 API Endpoints

### Autenticação
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Login do administrador | ❌ |

### Veículos
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/veiculos` | Listar veículos (com filtros) | ❌ |
| GET | `/api/veiculos/:id` | Detalhe do veículo | ❌ |
| POST | `/api/veiculos` | Criar veículo + upload de imagens | ✅ |
| PUT | `/api/veiculos/:id` | Atualizar dados do veículo | ✅ |
| PATCH | `/api/veiculos/:id/vendido` | Marcar como vendido | ✅ |
| DELETE | `/api/veiculos/:id` | Deletar veículo e imagens | ✅ |
| POST | `/api/veiculos/:id/imagens` | Adicionar imagens | ✅ |
| DELETE | `/api/veiculos/:id/imagens/:imagemId` | Remover imagem | ✅ |

**Filtros disponíveis via query string:**
```
GET /api/veiculos?marca=honda&tipo=carro&anoMin=2020&precoMax=80000&quilometragemMax=50000
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- PostgreSQL (via Supabase)

### Backend

```bash
# Entre na pasta
cd backend

# Instale as dependências
npm install

# Configure o .env (copie o .env.example e preencha)
cp .env.example .env

# Gere o Prisma Client
npx prisma generate

# Rode as migrations
npx prisma migrate dev --name init

# Popule o banco com o admin
npm run seed

# Inicie o servidor
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

### Frontend

```bash
# Entre na pasta
cd frontend

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## 🔐 Segurança

- Senhas armazenadas com **bcryptjs** (salt rounds: 12)
- Autenticação via **JWT** com expiração de 7 dias
- **Rate limiting** no endpoint de login — máximo 5 tentativas a cada 15 minutos
- **CORS** restrito ao domínio do frontend em produção
- Painel administrativo em **URL não indexada** — sem links no site público
- Variáveis sensíveis exclusivamente em variáveis de ambiente — nunca no código

---

## 📦 Schema do Banco de Dados

```prisma
model Veiculo {
  id            String   @id @default(cuid())
  titulo        String
  marca         String
  modelo        String
  ano           Int
  preco         Float
  quilometragem Int
  combustivel   String
  tipo          String
  cor           String
  descricao     String?
  vendido       Boolean  @default(false)
  imagens       Imagem[]
  criadoEm      DateTime @default(now())
  atualizadoEm  DateTime @updatedAt
}

model Imagem {
  id         String  @id @default(cuid())
  url        String
  ehPrimaria Boolean @default(false)
  veiculoId  String
  veiculo    Veiculo @relation(fields: [veiculoId], references: [id], onDelete: Cascade)
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  senha     String
  criadoEm  DateTime @default(now())
}
```

---

## 🌐 Deploy

### Backend — Render

| Campo | Valor |
|---|---|
| Root Directory | *(vazio)* |
| Build Command | `cd backend && npm install && npm run build` |
| Start Command | `cd backend && node src/server.js` |

O script `build` executa `prisma generate` + `seed` automaticamente.

### Frontend — Vercel

| Campo | Valor |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## 📄 Licença

Este projeto foi desenvolvido como produto comercial para uso do cliente **RD Veículos & Financiamentos**. Todos os direitos reservados.

---

<div align="center">
  <p>Desenvolvido por <strong>Leonardo Rosler</strong> Monky LTDA. 🦧</p>
  <p>
    <a href="https://github.com/leonardorosler">GitHub</a> ·
    <a href="https://linkedin.com/in/leonardorosler">LinkedIn</a>
  </p>
</div>
```