# 🚀 Discord Extract Application

Bem-vindo ao **Discord Extract**, uma aplicação desenvolvida em **Node.js** que permite extrair e encaminhar mensagens do Discord para o Telegram utilizando bots. Este guia fornecerá todas as etapas necessárias para que outra pessoa consiga implantar e executar esta aplicação em uma **VPS Windows**.

---

## 📋 Sumário

1. [📌 Requisitos](#-requisitos)
2. [🔧 Configuração da VPS Windows](#-configuração-da-vps-windows)
3. [💻 Instalação das Ferramentas Necessárias](#-instalação-das-ferramentas-necessárias)
   - [1. Instalar Node.js](#1-instalar-nodejs)
   - [2. Instalar MongoDB](#2-instalar-mongodb)
   - [3. Instalar Git](#3-instalar-git)
4. [📥 Clonar o Repositório](#-clonar-o-repositório)
5. [⚙️ Configurar Variáveis de Ambiente](#️-configurar-variáveis-de-ambiente)
   - [Criar e Configurar o Arquivo `.env`](#criar-e-configurar-o-arquivo-env)
6. [📦 Instalar Dependências](#-instalar-dependências)
   - [Instalar Dependências Node.js](#instalar-dependências-nodejs)
7. [🔐 Configuração dos Bots Discord e Telegram](#-configuração-dos-bots-discord-e-telegram)
   - [A. Configurar Bot no Discord](#a-configurar-bot-no-discord)
   - [B. Configurar Bot no Telegram](#b-configurar-bot-no-telegram)
8. [🚀 Executar a Aplicação](#-executar-a-aplicação)
9. [🔄 Configurar a Aplicação para Iniciar Automaticamente](#-configurar-a-aplicação-para-iniciar-automaticamente)
   - [Usando o NSSM (Non-Sucking Service Manager)](#usando-o-nssm-non-sucking-service-manager)
10. [🛡️ Configurar Firewall](#️-configurar-firewall)
11. [✅ Testar a Implantação](#-testar-a-implantação)
12. [📝 Manutenção e Dicas Adicionais](#-manutenção-e-dicas-adicionais)
13. [📚 Recursos Adicionais](#-recursos-adicionais)

---

## 📌 Requisitos

Antes de iniciar, certifique-se de que você possui:

- **Acesso a uma VPS Windows** com privilégios administrativos.
- **Conta no Discord** e **Bot Token**.
- **Conta no Telegram** e **Bot Token**.
- **Conhecimento básico** em linha de comando e configuração de serviços no Windows.

---

## 🔧 Configuração da VPS Windows

### 1. Acesso à VPS

- **RDP (Remote Desktop Protocol):**
  - Use o **Remote Desktop Connection** para acessar sua VPS.
  - Abra o RDP no seu computador local e insira o endereço IP da VPS, juntamente com as credenciais fornecidas pelo provedor.

### 2. Atualização do Sistema

- **Atualize o Windows:**
  - Acesse **Configurações** > **Atualização e Segurança** > **Windows Update**.
  - Clique em **Verificar atualizações** e instale todas as atualizações pendentes.
  
- **Reinicie a VPS** se necessário após as atualizações.

---

## 💻 Instalação das Ferramentas Necessárias

### 1. Instalar Node.js

1. **Baixar Node.js:**
   - Acesse [Node.js Oficial](https://nodejs.org/) e baixe a versão **LTS** recomendada para Windows.

2. **Instalar Node.js:**
   - Execute o instalador baixado.
   - Siga as instruções na tela, certificando-se de **incluir o Node.js no PATH**.

3. **Verificar Instalação:**
   - Abra o **Prompt de Comando** (CMD) ou **PowerShell**.
   - Execute:
     ```powershell
     node -v
     npm -v
     ```
   - Ambas as versões devem ser exibidas sem erros.

### 2. Instalar MongoDB

1. **Baixar MongoDB Community Server:**
   - Acesse [MongoDB Download](https://www.mongodb.com/try/download/community) e escolha a versão para Windows.

2. **Instalar MongoDB:**
   - Execute o instalador.
   - **Configurações Importantes:**
     - Selecione **Complete** durante a instalação.
     - Marque a opção **"Install MongoDB as a Service"** para que o MongoDB inicie automaticamente com o Windows.
     - Defina o **Data Directory** (o padrão geralmente é suficiente).

3. **Verificar Instalação:**
   - Abra o **Prompt de Comando** ou **PowerShell**.
   - Execute:
     ```powershell
     mongo --version
     ```
   - A versão do MongoDB deve ser exibida.

### 3. Instalar Git

1. **Baixar Git:**
   - Acesse [Git Oficial](https://git-scm.com/download/win) e baixe o instalador para Windows.

2. **Instalar Git:**
   - Execute o instalador baixado.
   - Siga as instruções na tela, mantendo as configurações padrão recomendadas.

3. **Verificar Instalação:**
   - Abra o **Prompt de Comando** ou **PowerShell**.
   - Execute:
     ```powershell
     git --version
     ```
   - A versão do Git deve ser exibida.

---

## 📥 Clonar o Repositório

1. **Navegar até o Diretório Desejado:**
   - Abra o **Prompt de Comando** ou **PowerShell**.
   - Navegue até o diretório onde deseja clonar o projeto:
     ```powershell
     cd C:\caminho\para\diretorio
     ```

2. **Clonar o Repositório:**
   - Execute o comando de clonagem:
     ```powershell
     git clone https://github.com/usuario/repo-discord-extract.git
     ```
   - **Nota:** Substitua `https://github.com/usuario/repo-discord-extract.git` pelo URL real do seu repositório.

---

## ⚙️ Configurar Variáveis de Ambiente

### Criar e Configurar o Arquivo `.env`

1. **Navegar até o Diretório Node.js:**
   ```powershell
   cd C:\caminho\para\repo-discord-extract\discord_extract_node
   ```

2. **Criar o Arquivo `.env`:**
   - No **Explorer**, dentro de discord_extract_node, crie um arquivo chamado `.env`.

3. **Adicionar as Variáveis ao `.env`:**

   Abra o arquivo `.env` com um editor de texto (como o **Notepad**) e adicione:
   ```env
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/scrapping-tweets-smarteye

   # Discord API Credentials
   TOKEN_DISCORD=seu_token_discord
   CHANNEL_ID=123456789012345678

   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=seu_telegram_bot_token
   TELEGRAM_CHAT_ID=987654321

   # Cron Job Configuration
   CRON_SCHEDULE=*/30 * * * * *
   CRON_HOURS=6

   # Servidor
   PORT=80
   ```

   **Descrição das Variáveis:**

   - **MONGO_URI:** URI de conexão com o MongoDB.
   - **TOKEN_DISCORD:** Token do seu bot Discord.
   - **CHANNEL_ID:** ID do canal Discord de onde as mensagens serão extraídas.
   - **TELEGRAM_BOT_TOKEN:** Token do seu bot Telegram.
   - **TELEGRAM_CHAT_ID:** ID do chat Telegram para onde as mensagens serão enviadas.
   - **CRON_SCHEDULE:** Expressão cron para agendamento da coleta de mensagens (por padrão, a cada 30 segundos).
   - **CRON_HOURS:** Número de horas para retroceder ao coletar mensagens.
   - **PORT:** Porta onde o servidor Node.js irá rodar (80 para HTTP padrão).

   **Exemplo Completo de `.env`:**
   ```env
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/scrapping-tweets-smarteye

   # Discord API Credentials
   TOKEN_DISCORD=ODk5MDM3NjA1NTkzOTYw.YGmGgQ.QjzU9OgZrD4zm0YQ0i3mfxqwHSE
   CHANNEL_ID=123456789012345678

   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
   TELEGRAM_CHAT_ID=987654321

   # Cron Job Configuration
   CRON_SCHEDULE=*/30 * * * * *
   CRON_HOURS=6

   # Servidor
   PORT=80
   ```

   **Notas:**

   - **Segurança:** Garanta que este arquivo `.env` **não seja compartilhado** ou versionado no controle de versão público, pois contém credenciais sensíveis.
   - **Formatação:** Certifique-se de que não haja espaços adicionais e que os valores estejam corretos.

---

## 📦 Instalar Dependências

### Instalar Dependências Node.js

1. **Navegar até o Diretório Node.js:**
   ```powershell
   cd C:\caminho\para\repo-discord-extract\discord_extract_node
   ```

2. **Instalar Dependências:**
   ```powershell
   npm install
   ```
   
   **Nota:**
   - Certifique-se de que o arquivo `package.json` está corretamente configurado com todas as dependências necessárias.

3. **Verificar Dependências Instaladas:**
   - Após a instalação, uma pasta `node_modules` deve existir dentro de discord_extract_node.

---

## 🔐 Configuração dos Bots Discord e Telegram

### A. Configurar Bot no Discord

1. **Criar um Bot no Discord:**
   - Acesse o [Discord Developer Portal](https://discord.com/developers/applications).
   - Clique em **"New Application"** e dê um nome para o seu aplicativo.
   
2. **Obter o Token do Bot:**
   - No menu lateral, vá para **"Bot"**.
   - Clique em **"Add Bot"** e confirme.
   - Em **"TOKEN"**, clique em **"Copy"** para obter o Token do Bot. **Guarde-o com segurança**.

3. **Convidar o Bot para seu Servidor:**
   - Ainda no Developer Portal, vá para **"OAuth2"** > **"URL Generator"**.
   - Em **"Scopes"**, selecione **"bot"**.
   - Em **"Bot Permissions"**, selecione as permissões necessárias (por exemplo, **"Read Messages"**, **"Send Messages"**, etc.).
   - Copie a URL gerada e abra-a no navegador para convidar o bot ao seu servidor Discord.

4. **Obter o ID do Canal Discord:**
   - No Discord, ative o **"Modo de Desenvolvedor"** em **Configurações** > **Avançado** > **Modo de Desenvolvedor**.
   - Clique com o botão direito no canal desejado e selecione **"Copiar ID"** para obter o `CHANNEL_ID`.

### B. Configurar Bot no Telegram

1. **Criar um Bot no Telegram:**
   - Abra o Telegram e inicie uma conversa com o [BotFather](https://t.me/BotFather).
   - Envie o comando `/newbot` e siga as instruções para criar um novo bot.
   - Após a criação, o BotFather fornecerá um **Token de API** para o bot. **Guarde-o com segurança**.

2. **Obter o Chat ID do Telegram:**
   - Inicie uma conversa com o seu bot Telegram.
   - Envie uma mensagem qualquer.
   - Para obter o `TELEGRAM_CHAT_ID`, você pode usar a API do Telegram ou ferramentas como [Get IDs](https://getids.xyz/):

     - Abra a URL:
       ```
       https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
       ```
       Substitua `<YOUR_BOT_TOKEN>` pelo token do seu bot.
     - Encontre o `chat.id` na resposta JSON.

---

## 🚀 Executar a Aplicação

1. **Navegar até o Diretório Node.js:**
   ```powershell
   cd C:\caminho\para\repo-discord-extract\discord_extract_node
   ```

2. **Iniciar a Aplicação:**
   ```powershell
   npm run start
   ```
   
   - **Alternativamente**, execute diretamente com Node.js:
     ```powershell
     node index.js
     ```

   - **Saída Esperada:**
     ```
     Conectado ao MongoDB
     Cron job agendado com a seguinte expressão: "*/30 * * * * *"
     Servidor rodando em http://localhost:80
     ```

3. **Acessar a Interface Web:**
   - Abra um navegador e vá para `http://<IP_DA_SUA_VPS>`.
   - A página **"Extrator de Mensagens Discord"** deve ser exibida.

---

## 🔄 Configurar a Aplicação para Iniciar Automaticamente

### Usando o NSSM (Non-Sucking Service Manager)

O **NSSM** permite executar aplicações Node.js como serviços do Windows, garantindo que a aplicação inicie automaticamente com o sistema.

1. **Baixar o NSSM:**
   - Acesse o [Site Oficial do NSSM](https://nssm.cc/download) e baixe a versão adequada para Windows.
   - Extraia o arquivo baixado para um diretório, por exemplo, `C:\nssm`.

2. **Adicionar o Caminho do NSSM ao PATH (Opcional):**
   - Para facilitar o uso do NSSM a partir de qualquer diretório, adicione `C:\nssm\win64\bin` (ou o diretório correspondente) ao **PATH** do sistema:
     - Clique com o botão direito em **Este Computador** > **Propriedades** > **Configurações Avançadas do Sistema**.
     - Clique em **Variáveis de Ambiente**.
     - Em **Variáveis do Sistema**, encontre e selecione **Path**, depois clique em **Editar**.
     - Clique em **Novo** e adicione o caminho para o diretório `bin` do NSSM.
     - Clique em **OK** em todas as janelas para aplicar as mudanças.

3. **Criar um Serviço para a Aplicação Node.js:**

   - **Abrir o Prompt de Comando** ou **PowerShell** como **Administrador**.

   - **Adicionar o Serviço:**
     ```batch
     nssm install DiscordExtract_Node
     ```

   - **Configurar o Serviço no NSSM GUI:**
     - **Application > Path:**
       - Navegue até o executável do Node.js, geralmente localizado em:
         ```
         C:\Program Files\nodejs\node.exe
         ```
     - **Application > Startup Directory:**
       - Navegue até o diretório da aplicação:
         ```
         C:\caminho\para\repo-discord-extract\discord_extract_node
         ```
     - **Application > Arguments:**
       - Adicione `index.js` ou utilize o script definido no `package.json`:
         ```
         index.js
         ```
     - **Logs (Opcional):**
       - Na aba **I/O**, você pode definir arquivos de log para stdout e stderr para facilitar o debug.

     - **Finalizar a Configuração:**
       - Clique em **Install Service** para concluir a criação do serviço.

4. **Iniciar o Serviço:**

   - **No Prompt de Comando** ou **PowerShell**, execute:
     ```batch
     nssm start DiscordExtract_Node
     ```
   
   - **Verificar Status:**
     - Abra o **Gerenciador de Serviços** (services.msc) e localize `DiscordExtract_Node`.
     - Verifique se o serviço está **Em Execução**.

5. **Configurar o Serviço para Iniciar Automaticamente:**

   - Por padrão, o serviço deve estar configurado para **Iniciar Automaticamente**.
   - No **Gerenciador de Serviços**, clique com o botão direito em `DiscordExtract_Node` > **Propriedades**.
   - Em **Tipo de Inicialização**, selecione **Automático**.
   - Clique em **OK** para salvar as configurações.

---

## 🛡️ Configurar Firewall

Para que a aplicação seja acessível externamente, é necessário garantir que as portas utilizadas estejam abertas.

### Passo a Passo

1. **Abrir Porta no Firewall do Windows:**

   - **Abra o "Windows Defender Firewall com Segurança Avançada":**
     - Pressione `Win + R`, digite `wf.msc` e pressione **Enter**.

   - **Criar uma Nova Regra de Entrada:**
     - No painel esquerdo, clique em **Regras de Entrada**.
     - No painel direito, clique em **Nova Regra...**.

   - **Configurar a Regra:**
     - **Tipo de Regra:** Porta
     - **Protocolos e Portas:** TCP e portas específicas (por exemplo, `80` para HTTP ou outra porta definida no `.env`)
     - **Ação:** Permitir a conexão
     - **Perfil:** Selecionar conforme necessário (Domínio, Privado, Público)
     - **Nome:** `DiscordExtract_WebServer`

   - **Finalizar a Regra:**
     - Clique em **Concluir**.

2. **Verificar a Conexão:**

   - Acesse `http://<IP_DA_SUA_VPS>:80` no navegador para verificar se o servidor está rodando.
   - **Substitua** `<IP_DA_SUA_VPS>` pelo endereço IP da sua VPS.

---

## ✅ Testar a Implantação

1. **Acessar a Aplicação via Navegador:**

   - Abra um navegador e vá para `http://<IP_DA_SUA_VPS>:80`.
   - A página **"Extrator de Mensagens Discord"** deve ser exibida.

2. **Testar a Funcionalidade:**

   - **Extrair Mensagens:**
     - Insira o **ID do Canal Discord** ou deixe em branco para canal geral.
     - Defina o número de **horas** para retroceder.
     - Clique em **"Extrair Mensagens"**.

   - **Verificar Resultados:**
     - Após o processamento, os links para download das mensagens devem aparecer na seção **Resultados**.

3. **Verificar MongoDB:**

   - Use uma ferramenta como **MongoDB Compass** ou **Mongo Shell** para conectar ao seu banco de dados e verificar se as mensagens estão sendo armazenadas corretamente.
     ```powershell
     mongo
     use scrapping-tweets-smarteye
     db.messages.find().pretty()
     ```

4. **Verificar Envio para Telegram:**

   - Acesse o chat Telegram vinculado ao seu bot e verifique se as mensagens extraídas do Discord estão sendo enviadas corretamente.

---

## 📝 Manutenção e Dicas Adicionais

- **Atualizações de Segurança:**
  - Mantenha o Windows e todas as ferramentas (**Node.js**, **MongoDB**) atualizados para garantir segurança e desempenho.

- **Monitoramento de Logs:**
  - Verifique os logs gerados pela aplicação e serviços para identificar e resolver possíveis problemas.
  - Se configurou logs no NSSM, verifique os arquivos de log especificados.

- **Backup do Banco de Dados:**
  - Realize backups periódicos do MongoDB para evitar perda de dados.
  - Utilize ferramentas como **mongodump** para criar backups:
    ```powershell
    mongodump --db scrapping-tweets-smarteye --out C:\backup\scrapping-tweets-smarteye
    ```

- **Gestão de Dependências:**
  - Mantenha as dependências do Node.js atualizadas. Use `npm update` regularmente:
    ```powershell
    npm update
    ```

- **Segurança das Credenciais:**
  - Nunca compartilhe seu arquivo `.env` ou quaisquer credenciais sensíveis.
  - Considere utilizar ferramentas de gerenciamento de segredos para ambientes de produção.

- **Gerenciamento de Serviços:**
  - Utilize o **NSSM** para gerenciar o serviço Node.js, permitindo reinicializações automáticas em caso de falhas.

---

## 📚 Recursos Adicionais

- **Node.js:**
  - [Documentação Oficial](https://nodejs.org/en/docs/)
  
- **MongoDB:**
  - [Documentação Oficial](https://docs.mongodb.com/)
  
- **Discord Developer Portal:**
  - [Documentação Oficial](https://discord.com/developers/docs/intro)
  
- **Telegram Bot API:**
  - [Documentação Oficial](https://core.telegram.org/bots/api)
  
- **NSSM (Gerenciamento de Serviços):**
  - [Site Oficial](https://nssm.cc/)
  
- **Métodos para Obter Chat ID no Telegram:**
  - [Get IDs](https://getids.xyz/)
  
- **Express.js:**
  - [Documentação Oficial](https://expressjs.com/)

---

# 🔗 Links Úteis

- **GitHub Repository:** [https://github.com/usuario/repo-discord-extract](https://github.com/usuario/repo-discord-extract) *(Substitua pelo link real)*
- **MongoDB Download:** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Node.js Download:** [https://nodejs.org/](https://nodejs.org/)
- **Git Download:** [https://git-scm.com/download/win](https://git-scm.com/download/win)
- **NSSM Download:** [https://nssm.cc/download](https://nssm.cc/download)
- **Discord Developer Portal:** [https://discord.com/developers/applications](https://discord.com/developers/applications)
- **Telegram BotFather:** [https://t.me/BotFather](https://t.me/BotFather)
