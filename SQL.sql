CREATE DATABASE controle_documentos;

USE controle_documentos;

CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mawb VARCHAR(50) NOT NULL,
    data_recebimento DATE NOT NULL,
    hora_recebimento TIME NOT NULL,
    peso DECIMAL(10,2) NOT NULL,
    origem VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL
);
