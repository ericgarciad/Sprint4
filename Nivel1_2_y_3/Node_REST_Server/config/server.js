const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
// Importamos datos de Users para tener el código más limpio y mantenible
let userData = require("../dataJson/users");
// Modulos necesarios para subir imagenes con Multer
var multer = require('multer'); // Libreria para subir fotos https://github.com/expressjs/multer
var upload = multer({ dest: './upload' });
// Importamos multer.js para separar por modulos para tener el código más limpio y mantenible
const uploadMulter = require('./multer');


// Creamos variable Versión de nuestra API para manener la versión por lo que nuestra URL de users serà
//>>>> http://localhost:8000/v1/users/ <<<<//
let version = "v1";
//----------------------------- API USERS -----------------------------//
//----------------------------- USO DE HBS -----------------------------//

// Permitir renderizado mediante HBS
app.engine('html', hbs.__express);
// Por defecto en el módulo "HBS" se guarda en 'views' pero podemos modificar la ruta mediante:
app.set('views', path.join('./public'))
app.set('view engine', 'html');

// Renderizar páginas HTML para visualizarlas

// Renderizar index.html
app.get('/index.html', function (req, res) {
    res.render('index.html')
})

// Renderizar about.html
app.get('/about.html', function (req, res) {
    res.render('about.html')
})

// Renderizar about.html
app.get('/aboutUp.html', function (req, res) {
    res.render('aboutUp.html')
})
// Cargar datos de users 

/* Usamos el método get para obtener la ruta (http://localhost:8000/v1/users) y usamos res.json para mostrar
los datos que contiene la constante userData creada anteriormente en nuestra ruta (http://localhost:8000/v1/users)
He decidido añadir la "URL" solicitada por separado, ya que será la misma para todos los usuarios y de esta 
manera no se repetirá por cada usuario.
*/
app.get('/' + version + '/users', function (req, res) {
    res.json({
        users: userData,
        urlRequest: req.url
    })

})

//----------------------------- Upload Images -----------------------------//

// En la variable upload añadimos la ejecución del código de multer.js con las comprobaciones y el archivo subido para guardar el archivo si todo va bien
// en multer usamos storage a la que pasamos como y donde guardamos el archivo y fileFilter para filtrar que archivo permitimos subir / single es porque permitimos subir 1 archivo a la vez
var upload = multer({ storage: uploadMulter.multerDiskStorage, fileFilter: uploadMulter.fileFilter }).single('file');

app.post('/upload', async (req, res) => {
    upload(req, res, function (err) {
        // Controlamos si no hemos subido ningu narchivo o si la función fileFilter no ha permitido subir el archivo por tener una extensión no permitida
        if (!req.file) {
            return res.status(400).send("You don't upload any file or the file doesn't have an allowed extension (only jpg, png or gif is allowed)")
        } else { // Si todo sale bien status(200) se guarda el archivo.
            res.status(200).send("The file " + req.file.originalname + " has been successfully uploaded to /upload");
        }
        if (err) {
            console.log("Error: " + err);
        }

    })
});

// Usamos el puerto 8000 y mostramos un mensaje por consola para saber que el servidor está funcionando
app.listen(8000, function () {
    console.log("server is running")
})