CREATE DATABASE ByteQuest;
USE ByteQuest;

CREATE TABLE Player (
    idPlayer INT PRIMARY KEY AUTO_INCREMENT unique,
    nick VARCHAR(45),
    cpf varchar(18) UNIQUE,
    email VARCHAR(60) UNIQUE,
    senha VARCHAR(45)
    )  AUTO_INCREMENT=1;

CREATE TABLE Resultados (
    idResultado INT PRIMARY KEY AUTO_INCREMENT,
    idPlayer INT,
    resultado VARCHAR(100),
    dataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPlayer) REFERENCES Player(idPlayer) ON DELETE CASCADE
) AUTO_INCREMENT=1;


select * from Player;

select * from Resultados;

SELECT p.nick AS Nome, r.resultado AS Final, COUNT(r.idResultado) AS Quantidade FROM Player p JOIN Resultados r ON p.idPlayer = r.idPlayer
GROUP BY p.nick, r.resultado;



