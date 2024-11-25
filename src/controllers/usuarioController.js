var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idPlayer,
                            nick: resultadoAutenticar[0].nick,
                            email: resultadoAutenticar[0].email,
                            cpf: resultadoAutenticar[0].cpf,
                            senha: resultadoAutenticar[0].senha,
                            // aquarios: resultadoAutenticar
                        }); 
                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAutenticar) => {
                        //         if (resultadoAutenticar.length > 0) {
                                    
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                        //     })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nick = req.body.nickServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if ( nick == undefined) {
        res.status(400).send(`Seu nick está undefined`);
    } else if (cpf == undefined) {
        res.status(400).send(`Seu cpf está undefined`);
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {


        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nick, cpf, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function postResultadoQuiz(req, res) {
    console.log(req.body); // Verifique o conteúdo do corpo da requisição
    const idPlayer = req.body.idPlayer;
    const resultado = req.body.resultado;

    resultadoModel.postResultadoQuiz(idPlayer, resultado)
    .then(response => {
        return res.status(201).json(response);
    })
    .catch(e => {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao processar a requisição' });
    });
}

module.exports = {
    autenticar,
    cadastrar
}