//importando o pacote express
const { request } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');

//preparar para usar o express;
const app = express();
app.use(express.json());

const repositories = [];

//1 paramatro o nome da rota 
//2 parametro ação que vou fazer funcao
//java script arrow function
// (parametros) => {  codigos programa fazer }


app.get('/', (request, response) => {
    return response.json(repositories);
});


app.post('/', (request, response) => {
    const { name, email } = request.body;
    //destruturação 
    const newStudent = { id: uuid(), name, email };
    repositories.push(newStudent);
    return response.json({ newStudent });
});

app.put('/:id', (request, response) => {
    //route params guid
    const { id } = request.params;
    const { name, email } = request.body;
    //id enviado existe no array?
    const studentResearch = repositories.findIndex(studentIndex => studentIndex.id == id);
    if (studentResearch < 0) {
        return response.status(404).json({ "error": "Student not found" });
    }
    const newStudent = { id, name, email };
    repositories[studentResearch] = newStudent;
    return response.json(newStudent);

});

app.delete('/:id', (request, response) => {
    const { id } = request.params;
    //id enviado existe no array?
    const studentResearch = repositories.findIndex(studentIndex => studentIndex.id == id);
    if (studentResearch < 0) {
        return response.status(404).json({ "error": `Student ${id} not found` });
        //template string
    }
    repositories.splice(studentResearch, 1);
    return response.json({ "Message": `Student ${id} removed` });
});
//crud 

module.exports = app.listen(3333, () => {
    console.log("Server running");
});

