const express = require('express');
const app = express();
const body_parser = require("body-parser");
const connection = require('./database/database');
const perguntaModel = require('./database/Perguntas');
const Pergunta = require('./database/Perguntas');
const respostaModel = require("./database/Resposta");
const Resposta = require('./database/Resposta');

//database
connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//Selecionando um reinderizador de HTML "VIEW ENGINE"
app.set('view engine', 'ejs');
//Fazendo o EJS aceitar Arquivos Estáticos (CSS , JS ...)
app.use(express.static('public'))

//comando que traduz os arquivos enviados pelo navegador
app.use(body_parser.urlencoded({ extended: false }))
//comando que permite trabalhar com arquivos JSON
app.use(body_parser.json())

//Rota principal
app.get('/', (req, res) => {
    //selecionando os dados do banco de dados
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']// raw === pesquisa mais CRUA dos dados no bancos(somente os dados necessários titulo e descrição) 
        //ORDER === ordenando a forma como os dados se apresentaram (ID Decrescente) (DESC == decrescente || ASC === crescente)
    ]}).then(pergunta => {//reinderizando os dados na view engine
        res.render('index', {
            pergunta: pergunta
        })
    });
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

//Formulário sendo recebido
app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    //salvando no banco de Dados
    perguntaModel.create({// esta campo faz o papel do código para criar tabelas no MySql
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')//redireciona para a página inicial 
    });
});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        //O primeiro parametro  da property "Where" é o campo a ser procurado e o segundo o que estamos procurando
        where:{id: id}// Condicional: Fazer busca por ids parecidos com o a require 
    }).then(pergunta => {
        if(pergunta !== null) {
            
            Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [
                ['id', 'DESC']
            ]
            }).then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,//passando o parâmetro pergunta pro html/EJS
                    respostas: respostas
                });
            });
            
        } else {
            res.redirect('/')
        }
    });
});

app.post("/responder", (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;

    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+ perguntaId);
    })
})

app.listen(8000, () => {
    console.log("aplicação em execução...")
});
