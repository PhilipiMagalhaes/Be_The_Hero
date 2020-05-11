const app = require('./app');
const port = 3333;

app.listen(port, function () {
    console.log(`Servidor iniciado na porta ${port}`);
});