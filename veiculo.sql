CREATE TABLE aviao (
    id integer PRIMARY KEY,
    nome text NOT NULL,
    tipo text NOT NULL,
    marca text NOT NULL,
    ano_modelo text NOT NULL
);

CREATE TABLE carro(
    id integer PRIMARY KEY,
    nome text NOT NULL,
    tipo text NOT NULL,
    cambio text NOT NULL,
    combustivel text NOT NULL
);

CREATE TABLE barco(
    id integer PRIMARY KEY,
    nome text NOT NULL,
    tipo text NOT NULL,
    tamanho text NOT NULL
);