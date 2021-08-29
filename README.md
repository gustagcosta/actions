# The Full Stack Project

### Objetivo

Construir uma aplicação web completa, desde o levantamento dos requisitos até o deploy, demonstrando o conhecimento adquirido ao longo de anos estudando programação.

### Idéia

Em muitas equipes existe a dificuldade de atribuições de tarefas e ações, diante desse cenário o software a ser desenvolvido será uma plataforma de gerenciamento de ações com atribuições de responsáveis e controle de prazos e também um relatório analítico para visualização do sistema como um todo. 

### Funcionamento

Haverá um fluxo simples de cadastro de usuários e 3 tipos de usuários.

- admin: usuário root do sistema que terá o controle de todos os usuários.
- manager: usuário que irá atribuir ações e consultar os relatórios
- common: usuário que irá visualizar as ações atribuídas, receber os avisos e poderá concluir as mesmas.

Uma ação é composta de um título, uma descrição, um responsável, e um prazo.

A ação terá um fluxo de status 

- WIP → pendente ser resolvida
- DONE → feita
- LATE → o prazo expirou

O relatório será uma relação de listagem de ações, em andamento, atrasadas e concluídas, podendo ver a lista de responsáveis de acordo com o filtro.

### Stack

- NodeJS para criação da API
- Em desenvolvimento banco de dados MYSQL
- Em produção POSTGRESQL
- Knex.js como lib de manipulação do banco
- ReactJS para criação da interface
- React Bootstrap + Bootswatch como framework css