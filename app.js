
const express = require('express');

const path = require('path');

//Rutas de Controladores
const equiposRoutes = require('./routes/equipos');


const bodyParser = require('body-parser');
const url = require('url');    




// Crea una instancia de Express.js
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Configura middlewares y rutas

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/equipos', function(req, res) {
    res.sendFile(__dirname + '/public/equipos.html');
});
app.get('/equipos/agregar', function(req, res) {
    res.sendFile(__dirname + '/public/agregarEquipos.html');
});
app.get('/equipos/editar', function(req, res) {
    res.sendFile(__dirname + '/public/editarEquipos.html');
});

app.get('/equipos/editar/:id', function(req, res) {
  const id = req.params.id;
  res.redirect(url.format({
    pathname:"/equipos/editar",
    query: {
      "id": id,
    }
  }));
});


//archivos de plantilla
app.get('/assets/demo/chart-area-demo.js', function(req, res) {
    res.sendFile(__dirname + '/public/assets/demo/chart-area-demo.js');
});
app.get('/assets/demo/chart-bar-demo.js', function(req, res) {
    res.sendFile(__dirname + '/public/assets/demo/chart-bar-demo.js');
});
app.get('/css/styles.css', function(req, res) {
    res.sendFile(__dirname + '/public/css/styles.css');
});
app.get('/js/datatables-simple-demo.js', function(req, res) {
    res.sendFile(__dirname + '/public/js/datatables-simple-demo.js');
});
app.get('/js/scripts.js', function(req, res) {
    res.sendFile(__dirname + '/public/js/scripts.js');
});
app.get('/assets/img/error-404-monochrome.svg', function(req, res) {
    res.sendFile(__dirname + '/public/assets/img/error-404-monochrome.svg');
});


app.use('/equipos', equiposRoutes);
  
// Define una ruta para recursos estáticos
app.set('views', path.join(__dirname, 'views'));



// Maneja errores de rutas no encontradas
app.use((req, res, next) => {
  res.sendFile(__dirname + '/public/404.html');
  // res.status(404).send('Página no encontrada');
});

// Maneja errores de servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(__dirname + '/public/500.html');
  // res.status(500).send('Error del servidor');
});



// Inicia el servidor en el puerto especificado
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
