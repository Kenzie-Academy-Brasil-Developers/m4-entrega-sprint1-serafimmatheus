# Entrega 01 - QUARTER 04

### Nesta entrega vamos desenvolver um CRUD de usuário, criando algumas regras de acesso apenas para usuários administradores.

# Endpoints do serviço:

## Método Endpoint Responsabilidade

#### POST /users Criação de usuários

#### POST /login Gera um token JWT recebendo email e password no corpo da requisição como JSON.

#### GET /users Lista todos os usuários

#### GET /users/profile Retorna os dados do usuário logado (usuário a qual pertence o token que será necessário neste endpoint)

#### PATCH /users/<uuid> Atualiza os dados de um usuário

#### DELETE /users/<uuid> Deleta usuários do banco

# Exemplos de requisições:

## Criando usuário:

**<font color="green">POST</font> /users**

```js
{
    "name": "daniel",
    "email": "daniel@kenzie.com",
    "password": "123456",
    "isAdm": true
}
```

**<font color="green">POST</font> /users - Formato da Resposta - <font color="lime">STATUS 201</font>**

```js
{
    "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
    "createdOn": "2021-11-18T01:23:52.910Z",
    "updatedOn": "2021-11-18T01:23:52.910Z",
    "name": "daniel"
    "email": "daniel@kenzie.com",
    "isAdm": true
}
```

## Criando usuário com e-mail já existente:

**<font color="green">POST</font> /users**

```js
{
    "name": "daniel",
    "email": "daniel@kenzie.com",
    "password": "123456",
    "isAdm": true
}
```

**<font color="green">POST</font> /users - Formato da Resposta <font color="lime">STATUS: 400 BAD REQUEST</font>**

```js
{
    "message": "E-mail already registered"
}
```

## Login:

**<font color="green">POST</font> /login**

```js
{
    "email": "daniel@kenzie.com",
    "password": "123456",
}
```

**<font color="green">STATUS:</font> 200 OK**

```js
{
    "token": "4b72c6f34b72c6f3-6d0a-6a1-86c6-687d52de4fc7-6d0a-6a1-86c6-687d2c6f3-6d0a-6a1-86c6-687d52de4fc74b72c6f3-6d0a-6a1-86c6-687d52de4fc7"
}
```

## Login inválido:

**<font color="green">POST:</font> /login**

```js
{
    "email": "daniel@mail.com",
    "password": "123456",
}
```

**<font color="green">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Wrong email/password"
}

```

## Listando usuários:

**<font color="green">GET</font> /users**

#### Com header de autorização.

**<font color="green">Status:</font> 200 ok**

```js
[
  {
    uuid: "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
    createdOn: "2021-11-18T01:23:52.910Z",
    updatedOn: "2021-11-18T01:23:52.910Z",
    name: "daniel",
    password: "e10adc3949ba59abbe56e057f20f883e",
    email: "daniel@kenzie.com",
    isAdm: true,
  },
];
```

## Listando usuários sem token:

**<font color="green">GET</font> /users**

#### Sem header de autorização.

**<font color="green">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Missing authorization headers",
}
```

## Listando usuários sem ser administrador:

**<font color="green">GET</font> /users**
**<font color="lime">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Unauthorized",
}
```

## Dados do perfil:

**<font color="green">GET</font> /users/profile**

#### Com header de autorização.

**<font color="lime">Status:</font> 200 OK**

```js
{
    "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
    "createdOn": "2021-11-18T01:23:52.910Z",
    "updatedOn": "2021-11-18T01:23:52.910Z",
    "name": "daniel"
    "email": "daniel@kenzie.com",
    "isAdm": true
}
```

## Dados do perfil sem token:

**<font color="green">GET</font> /users/profile**

#### Sem header de autorização.

**<font color="lime">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Missing authorization headers",
}
```

## Atualizando usuário

**<font color="green">PATCH</font> /users/:uuid**

#### Com header de autorização.

```js
{
    "name": "Daniel Kenzie"
    "email": "daniel@kenzie.com.br",
    "password": "123",
    "isAdm": true
}
```

**<font color="lime">Status:</font> 200 OK**

```js
{
    "uuid": "4b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
    "createdOn": "2021-11-18T01:23:52.910Z",
    "updatedOn": "2021-11-21T07:44:21.520Z",
    "name": "Daniel Kenzie"
    "email": "daniel@kenzie.com.br",
    "isAdm": true
}
```

## Atualizando usuário sem token

**<font color="green">PATCH</font> /users/:uuid**

#### Sem header de autorização.

```js
{
    "name": "Daniel Kenzie"
    "email": "daniel@kenzie.com.br",
    "password": "123",
    "isAdm": true
}
```

**<font color="lime">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Missing authorization headers",
}
```

## Atualizando outro usuário sem ser administrador

**<font color="green">PATCH</font> /users/:uuid**

## Com header de autorização.

```js
{
    "name": "Daniel Kenzie"
    "email": "daniel@kenzie.com.br"
    "password": "123",
    "isAdm": false
}
```

**<font color="lime">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Missing admin permissions"
}
```

## Excluindo usuário

**<font color="green">DELETE</font> /users/:uuid**

#### Com header de autorização.

**<font color="lime">Status:</font> 200 OK**

```js
{
    "mesage": "User deleted with success"
}
```

## Excluindo usuário sem token

**<font color="green">DELETE</font> /users/:uuid**

#### Sem header de autorização.

**<font color="lime">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Missing authorization headers"
}
```

## Excluindo outro usuário sem ser administrador

**<font color="green">DELETE</font> /users/:uuid**

#### Com header de autorização.

**<font color="lime">Status:</font> 401 UNAUTHORIZED**

```js
{
    "message": "Missing admin permissions",
}
```
