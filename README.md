<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Api Bank da Konv, desafio proposto para a vaga Full Stack.

## Bibliotecas utilizadas

- Node.js v16.15.1
- Nest.js 8.2.8
- Docker and docker-compose

Api Bank da Konv, desafio proposto para a vaga Full Stack.

## Run with docker-compose

```bash
#DB and API
docker-compose up -d --build
```

Ou executar somente o DB (caso queira depurar o código localmente)

```bash
#DB
docker run --name konv-db -p 3306:3306 -e MARIADB_ROOT_PASSWORD=root -e MYSQL_DATABASE=bank -d mariadb:latest
```

Para executar localmente (depurar)

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```
