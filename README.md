# Projeto Login — API de Autenticação com Node.js, Express e Prisma

Projeto de estudo com o objetivo de aprender construção de uma API REST com autenticação completa, usando um ORM (Prisma) e organização de código em camadas (rotas, controllers, middlewares e configuração).

## Funcionalidades

- Cadastro de usuário, com senha protegida por hash (bcrypt)
- Login com geração de token JWT
- Rota protegida por middleware de autenticação
- Frontend simples (HTML, CSS e JavaScript puro) consumindo a API via `fetch`, com fragmentos de tela trocados dinamicamente
- Logout com remoção do token

## Tecnologias

- **Node.js** + **Express** — servidor e rotas
- **Prisma ORM** — modelagem e acesso ao banco de dados
- **MySQL** — banco de dados
- **bcrypt** — hash de senhas
- **jsonwebtoken (JWT)** — autenticação via token
- **dotenv** — variáveis de ambiente
- **nodemon** — reinício automático do servidor em desenvolvimento

## Estrutura do projeto

```
projeto-login/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middlewares/
│   │   └── authMiddlewares.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── app.js
│   └── server.js
├── public/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── fragments/
├── prisma.config.ts
└── package.json
```

## Como rodar o projeto

1. Clone o repositório e instale as dependências:
   ```
   npm install
   ```

2. Crie um banco de dados vazio no MySQL.

3. Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais:
   ```
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   JWT_SECRET="sua_chave_secreta_aqui"
   ```

4. Gere o Prisma Client e rode as migrations:
   ```
   npx prisma generate
   npx prisma migrate dev
   ```

5. Inicie o servidor em modo desenvolvimento:
   ```
   npm run dev
   ```

6. Abra o `public/index.html` (recomendado usar uma extensão tipo Live Server, para evitar problemas de CORS ao abrir direto pelo `file://`).

## Rotas da API

| Método | Rota | Descrição | Protegida? |
|---|---|---|---|
| POST | `/users/cadastro` | Cria um novo usuário | Não |
| POST | `/users/login` | Autentica e retorna um token JWT | Não |
| GET | `/users/perfil` | Retorna dados do usuário autenticado | Sim (JWT) |

## Dificuldade enfrentada: mudanças do Prisma na versão 7

Durante a Etapa 2 (integração com o banco via Prisma), o projeto usou a versão 7 do Prisma, lançada recentemente — e isso trouxe várias mudanças estruturais em relação ao que a maioria dos tutoriais e documentações ainda ensina:

- **Gerador padrão trocado**: por padrão, a v7 passou a gerar um client baseado em TypeScript/ESM (`provider = "prisma-client"`), em vez do client clássico em JavaScript puro (`prisma-client-js`) que a maioria dos exemplos assume. Foi necessário forçar explicitamente o gerador clássico no `schema.prisma`.
- **Local de geração do client**: por causa de um `output` deixado pelo template padrão do `npx prisma init`, o client estava sendo gerado dentro do próprio projeto (`src/generated/prisma`) em vez de `node_modules/.prisma/client`, quebrando o `require("@prisma/client")` padrão.
- **Configuração movida para `prisma.config.ts`**: a URL de conexão com o banco não é mais lida diretamente do `schema.prisma` (`env("DATABASE_URL")`); passou a ser configurada em um novo arquivo, `prisma.config.ts`, gerado automaticamente pelo `prisma init`.
- **Driver Adapters obrigatórios**: a v7 removeu o motor de conexão embutido (engine Rust) — agora é necessário instalar e configurar explicitamente um "adapter" de conexão (no caso do MySQL, o pacote `@prisma/adapter-mariadb`) e passá-lo na criação do `PrismaClient`, em vez de simplesmente instanciar `new PrismaClient()`.

## Aprendizados principais

- Organização de um projeto Node.js em camadas (rotas, controllers, middlewares, configuração)
- Uso de `require`/`module.exports` para dividir responsabilidades entre arquivos
- Modelagem de dados e migrations com um ORM
- Hash de senhas e por que nunca armazená-las em texto puro
- Autenticação stateless com JWT, e a diferença em relação a sessões
- Criação e uso de middlewares no Express
- Depuração de problemas causados por mudanças de versão em uma dependência
