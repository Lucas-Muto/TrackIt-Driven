# TrackIt - Acompanhamento de Hábitos

<div align="center">
  <img src="src/assets/logo-login.svg" alt="TrackIt Logo" width="200px" />
  <p>Desenvolva hábitos positivos e acompanhe seu progresso diário</p>
</div>

## 📱 Deploy

[[Acesse o TrackIt aqui](https://track-it-driven-8e6i.vercel.app)]

## 📝 Descrição

TrackIt é uma aplicação web mobile-first para acompanhamento de hábitos diários. Criada como projeto para o bootcamp da Driven Education, a aplicação permite aos usuários criar, monitorar e manter seus hábitos de forma organizada e visual. A versão desktop deve ser desconsiderada para análise do projeto.

Com uma interface intuitiva, o TrackIt proporciona ao usuário uma experiência fluida para gerenciar seus hábitos, visualizar o progresso e se manter motivado para atingir suas metas pessoais.

## ✨ Funcionalidades

- **Autenticação completa:** cadastro e login de usuários
- **Criação de hábitos:** adicione novos hábitos e defina em quais dias da semana deseja praticá-los
- **Visualização diária:** acompanhe os hábitos programados para o dia atual
- **Marcação de progresso:** marque e desmarque hábitos concluídos
- **Estatísticas de sequência:** visualize sua sequência atual e recorde para cada hábito
- **Exclusão de hábitos:** remova hábitos que não deseja mais acompanhar
- **Design responsivo:** interface adaptada para dispositivos móveis

## 🛠️ Tecnologias

- **React** - Biblioteca JavaScript para construção de interfaces
- **React Router DOM** - Navegação entre páginas
- **Styled Components** - Estilização com CSS-in-JS
- **Axios** - Cliente HTTP para requisições à API
- **React Loader Spinner** - Componentes de loading
- **dayjs** - Manipulação de datas

## 🚀 Como executar

Siga os passos abaixo para executar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trackit.git

# Acesse a pasta do projeto
cd trackit

# Instale as dependências
npm install

# Execute a aplicação
npm run dev
```

Acesse [`http://localhost:5173`](http://localhost:5173) no seu navegador para visualizar a aplicação.

## 🔄 Fluxo da aplicação

1. O usuário acessa a página de login ou cadastro
2. Após autenticação, é redirecionado para a página de hábitos do dia atual
3. Pode navegar entre as páginas:
   - Hoje: visualiza e marca hábitos do dia atual
   - Hábitos: cria novos hábitos e define sua recorrência semanal

## 🚀 Deploy na Vercel

Para fazer o deploy na Vercel, é importante considerar a compatibilidade de versões. O projeto usa:

1. React 18.x (downgrade da versão 19 para compatibilidade com react-loader-spinner)
2. Arquivo vercel.json para configuração do SPA routing

Se encontrar problemas de compatibilidade durante o deploy, você pode:

```bash
# Opção 1: Instalação com flag para ignorar avisos de peer dependencies
npm install --legacy-peer-deps

# Opção 2: Atualizar react-loader-spinner para uma versão compatível com React 19
# quando disponível
```

## 🧠 Aprendizados

Este projeto foi desenvolvido como parte do bootcamp da Driven Education e abrange diversos conceitos importantes:

- Autenticação e persistência de sessão
- Consumo de APIs RESTful
- Gerenciamento de estado com Context API
- Roteamento e navegação em aplicações SPA
- Estilização avançada com Styled Components
- UI/UX e design responsivo

## 🤝 Créditos

- [Driven Education](https://www.driven.com.br/) - Bootcamp e projeto original
- Desconsiderar versão Desktop pois o desafio consistia apenas para a versão mobile

---

<p align="center">Desenvolvido com 💙 durante o bootcamp da Driven Education</p>
