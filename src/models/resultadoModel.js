const database = require("../database/config")

function postResultadoQuiz(idPlayer, resultado) {
    const sql = `
        INSERT INTO resultados(idPlayer, resultado)
        VALUES(${idPlayer}, '${resultado}') 
    `;

    return database.executar(sql);
}
function obterResultados() {
    const sql = `
        SELECT resultado, COUNT(*) as quantidade
        FROM resultados
        GROUP BY resultado
    `;

    return database.executar(sql);
}

module.exports = {
    postResultadoQuiz,
    obterResultados 
};