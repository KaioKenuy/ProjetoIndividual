var resultadoModel = require("../models/resultadoModel");
function postResultadoQuiz(req, res) {
    console.log("Corpo da requisição:", req.body); // Adicione esta linha para verificar o que está chegando

    const idPlayer = req.body.idPlayer;
    const resultado = req.body.resultado;

    resultadoModel.postResultadoQuiz(idPlayer, resultado)
    .then(response => {
        return res.status(201).json(response);
    })
    .catch(e => {
        console.error(e); // Log do erro
        res.status(500).send("Erro ao processar a requisição."); // Retornar um erro 500
    });
}
var resultadoModel = require("../models/resultadoModel");

function obterResultados(req, res) {
    resultadoModel.obterResultados()
        .then(resultados => {
            res.json(resultados);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send("Erro ao obter os resultados.");
        });
}

module.exports = {
    postResultadoQuiz,
    obterResultados // Adicione esta linha
};
