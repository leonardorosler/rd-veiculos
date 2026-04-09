estrutura inicial de pastas do projeto


backend -> Node + Prisma + Supabase (autenticação JWT posterior)

backend/
├── src/
│   ├── controllers/   # lógica das rotas
│   ├── services/      # regras de negócio
│   ├── routes/        # definição de rotas
│   ├── middlewares/   # auth, validação
│   ├── config/        # configs (db, env)
│   └── server.js
│
├── prisma/
│   ├── schema.prisma
│


frontend -> React + CSS

frontend/
├── src/
│   ├── assets/        # imagens, ícones
│   ├── components/    # componentes reutilizáveis
│   ├── pages/         # páginas (Home, Detalhes, Admin, etc)
│   ├── services/      # chamadas API
│   ├── styles/        # CSS global
│   └── App.jsx
│
├── public/
│


padrao de commits 