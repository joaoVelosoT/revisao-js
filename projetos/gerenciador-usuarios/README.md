# Gerenciador de Usuários

## Sobre o projeto

Este projeto foi desenvolvido com o objetivo de revisar e consolidar fundamentos do JavaScript moderno, utilizando o Node.js para executar a aplicação.

Durante o desenvolvimento, pratiquei manipulação de arrays e objetos, organização de código em módulos e validação de dados de entrada.

## Funcionalidades

- Cadastro de usuários com geração automática de ID.
- Busca de usuários por ID.
- Listagem de todos os usuários.
- Exclusão de usuários por ID.
- Contagem de usuários cadastrados.
- Geração de relatório com quantidade de usuários, nomes e média de idade.

## Validações implementadas

- **Nome:** verifica se é uma string não vazia e rejeita valores compostos apenas por espaços.
- **Idade:** verifica se é um número inteiro maior que zero.
- **Dados de entrada:** verifica se o objeto recebido existe, se é válido e se não é um array.
- **ID:** verifica se é um número inteiro positivo antes de realizar buscas ou exclusões.
- **Usuário inexistente:** retorna uma resposta com status `404` quando o usuário não é encontrado.
- **Dados inválidos:** retorna uma resposta com status `400` quando os dados recebidos não atendem às regras de validação.
- **Respostas padronizadas:** utiliza uma função auxiliar para manter uma estrutura consistente nas respostas das operações.

## Tecnologias utilizadas

- JavaScript (ES Modules)
- Node.js
- Nodemon

## Como executar

Certifique-se de ter o Node.js e o npm instalados.

1. Clone o repositório:

   ```bash
   git clone https://github.com/joaoVelosoT/revisao-js/tree/master/projetos/gerenciador-usuarios
   ```

2. Entre na pasta do projeto:

   ```bash
   cd gerenciador-usuarios
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute a aplicação:

   ```bash
   npm run dev
   ```

## Aprendizados

Durante o desenvolvimento, revisei conceitos que já havia estudado e aprofundei meu entendimento sobre outros.

Pratiquei métodos de manipulação de arrays, como `map()`, `filter()` e `reduce()`, além do uso do operador spread (`...`) e da desestruturação de objetos.

Também trabalhei com validação de dados, tratamento de entradas inválidas, funções, módulos ES e padronização de respostas.

O projeto foi uma oportunidade de reforçar os fundamentos da linguagem por meio da prática e de compreender melhor como esses conceitos podem ser aplicados em uma aplicação backend.

## Observação

Os usuários são armazenados em um array na memória da aplicação. Portanto, os dados não são persistidos após o encerramento ou reinício do processo.
