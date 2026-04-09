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






garagem/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── vehicle.controller.js
│   │   │   └── auth.controller.js
│   │   ├── services/
│   │   │   ├── vehicle.service.js
│   │   │   └── auth.service.js
│   │   ├── routes/
│   │   │   ├── vehicle.routes.js
│   │   │   ├── auth.routes.js
│   │   │   └── index.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── utils/
│   │   │   └── supabase.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── VehicleCard/
│   │   │   │   ├── VehicleCard.jsx
│   │   │   │   └── VehicleCard.css
│   │   │   └── Filter/
│   │   │       ├── Filter.jsx
│   │   │       └── Filter.css
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── Home.jsx
│   │   │   │   └── Home.css
│   │   │   ├── VehicleDetail/
│   │   │   │   ├── VehicleDetail.jsx
│   │   │   │   └── VehicleDetail.css
│   │   │   └── Admin/
│   │   │       ├── Login/
│   │   │       ├── Dashboard/
│   │   │       └── VehicleForm/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useVehicles.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md