var express = require("express");
var router = express.Router();
var resultadoController = require("../controllers/resultadoController");

router.post("/postResultadoQuiz", (req, res) => {
    resultadoController.postResultadoQuiz(req, res)
});

router.get("/ultimos", (req, res) => {
    resultadoController.obterResultados(req, res);
});

module.exports = router;