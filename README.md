# Projeto de Desafios de APIs Backend

Bem-vindo ao repositório de desafios de APIs Backend! Este projeto foi criado para ser utilizado por nossos alunos iniciantes, servindo como base para a implementação dos desafios propostos ao longo do curso.

## Objetivo

O objetivo deste projeto é proporcionar um ambiente prático para que você desenvolva suas habilidades em programação backend, especialmente na criação de APIs. Aqui, você irá aplicar conceitos fundamentais como rotas, controllers, manipulação de dados, autenticação, e muito mais.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express.js:** Framework para criação de APIs de forma rápida e organizada.
- **SQLite:** Banco de dados relacional leve, para desafios que envolvem SQL.
- **Repositório em Memória:** Alternativa ao banco de dados, onde os dados são salvos em uma variável, para desafios mais simples.

## Pré-requisitos

Antes de começar, garanta que você tenha o [Node.js](https://nodejs.org/) (que inclui o `npm`) instalado em sua máquina.

## Como Começar

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DA_PASTA>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    O servidor será iniciado em `http://localhost:3000`.

## Estrutura do Projeto

A estrutura de arquivos foi pensada para ser simples e extensível:

```
.
├── src/
│   ├── data/
│   │   ├── memory.mjs    # Implementação do CRUD em memória
│   │   └── sqlite.mjs    # Implementação do CRUD com SQLite
│   └── index.mjs         # Arquivo principal com a configuração do Express e as rotas da API
├── .env                  # Arquivo para configurar o tipo de banco de dados (não versionado)
├── .env.example          # Exemplo de como o arquivo .env deve ser
├── API_CLIENT.http       # Arquivo para testar os endpoints da API
├── package.json          # Definições do projeto e dependências
└── README.md             # Esta documentação que você está lendo
```

### Principais Arquivos

-   **`src/index.mjs`**: É o coração da aplicação. Ele inicializa o servidor Express, define as rotas da API (endpoints) e contém a lógica para receber requisições e enviar respostas.
-   **`src/data/`**: Este diretório contém a camada de acesso a dados. Separamos a lógica de banco de dados da lógica da aplicação para que seja fácil alternar entre diferentes fontes de dados.
-   **`API_CLIENT.http`**: Um arquivo prático para testar sua API. Você pode usá-lo com extensões como a [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VS Code.

## Configurando o Banco de Dados

Este projeto permite que você alterne facilmente entre um banco de dados **em memória** (os dados são perdidos quando o servidor reinicia) e um banco de dados **SQLite** (os dados persistem).

Para escolher qual usar, crie um arquivo chamado `.env` na raiz do projeto (você pode copiar o `.env.example`) e defina a variável `DB_TYPE`:

-   **Para usar o banco em memória:**
    ```
    DB_TYPE=memory
    ```

-   **Para usar o SQLite:**
    ```
    DB_TYPE=sqlite
    ```

Por padrão, se o arquivo `.env` não existir, o banco de dados em memória será usado.

## Testando a API

Para testar os endpoints, abra o arquivo `API_CLIENT.http` e utilize uma extensão como a **REST Client** para VS Code. Com ela, você pode clicar em "Send Request" acima de cada rota para ver o resultado.

## Seu Desafio Começa Agora!

Agora que você já conhece a estrutura do projeto, está pronto para começar! Leia o enunciado do seu primeiro desafio e comece a codificar. Lembre-se de que o objetivo é aprender e praticar.

Boons estudos e divirta-se!


## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias principais:

### [Express](https://expressjs.com/)

O **Express** é um framework minimalista e flexível para Node.js, utilizado para criar servidores web e APIs de forma simples e rápida. No projeto, o Express é responsável por:

- Inicializar o servidor HTTP.
- Definir e gerenciar as rotas da API.
- Lidar com requisições e respostas HTTP.

### [SQLite](https://github.com/TryGhost/node-sqlite3/wiki/API)

O **SQLite** é um banco de dados relacional leve, baseado em arquivos, que não requer um servidor separado para funcionar. No projeto, o SQLite é utilizado como uma opção de persistência de dados, permitindo que as informações sejam salvas mesmo após o reinício do servidor. A implementação do CRUD com SQLite está localizada em `src/data/sqlite.mjs`.

### [Axios](https://axios-http.com/)

O **Axios** é uma biblioteca para realizar requisições HTTP a partir do Node.js ou do navegador. Embora o Axios não seja utilizado diretamente no backend deste projeto, ele pode ser usado em clientes (frontends ou scripts) para consumir a API criada aqui. No arquivo `API_CLIENT.http`, você pode simular requisições que seriam feitas por ferramentas como o Axios.

Essas tecnologias juntas proporcionam uma base sólida para o desenvolvimento de APIs modernas, com flexibilidade para testar e persistir dados conforme necessário.

