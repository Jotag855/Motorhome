CREATE TABLE VEICULO{
    id integer PRIMARY KEY,
    nome text NOT NULL,
    ano/modelo number NOT NULL,
    motor text,
    tipo text NOT NULL,
    cor text NOT NULL;

}

CREATE TABLE AVIAO {
    id integer PRIMARY KEY,
    nome text NOT NULL,
    tipo text NOT NULL,
    marca text NOT NULL,
    combustivel text NOT NULL;
}

CREATE TABLE CARRO{
    id integer PRIMARY KEY,
    nome text NOT NULL,
    tipo text NOT NULL,
    cambio text NOT NULL,
    combustivel text NOT NULL;
}

CREATE TABLE BARCO{
    id integer PRIMARY KEY,
    nome text NOT NULL,
    tipo text NOT NULL,
    tamanho text NOT NULL;
}
