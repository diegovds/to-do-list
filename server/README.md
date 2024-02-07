
# Back-end do My To-Do List

## Sobre o projeto

Projeto do back-end do My To-Do List, nele foi desenvolvida a API  utilizando o framework Fastify com TypeScript. Também utilizou-se PostgreSQL para o banco de dados e foi realizada a configuração para deploy na Vercel.



## Tecnologias

- Node
- Fastify
- Typescript
- Prisma
- Zod


## Documentação da API

#### Cria um novo usuário ou válida o usuário cadastrado

```http
  POST /users
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O email do usuário |
| `name`      | `string` | **Obrigatório**. O nome do usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |

O usuário deve estar autenticado para acessar as rotas abaixo.

#### Retorna os to-dos do usuário autenticado

```http
  GET /todos
```

#### Cria um novo to-do

```http
  POST /todos
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `content`      | `string` | **Obrigatório**. O conteúdo da tarefa |
| `priority`      | `string` | **Obrigatório**. A prioridade da tarefa. Só é aceita high, medium e low  |
| `status`      | `string` | **Obrigatório**. O status da tarefa. Só é aceito todo, progress e done |

#### Deleta um to-do

```http
  DEL /todos/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da tarefa que você quer deletar |

#### Atualiza um to-do

```http
  PUT /todos/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da tarefa que você quer atualizar |




## Instalação

- No terminal, clone o projeto:

```
git clone https://github.com/diegovds/to-do-list.git
```

- Acesse o diretório server usando:

```
cd .\server\
```

- Agora instale as dependências usando:

```
npm install
```

- Em seguida, inicie o projeto usando:

```
npm run dev
```

- Após a compilação, o servidor rodará na porta [localhost:3333](http://localhost:3333/)
    