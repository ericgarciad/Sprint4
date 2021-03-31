var multer = require('multer'); // Libreria para subir fotos https://github.com/expressjs/multer
const path = require('path');

// Guarda el nombre original del archivo en /upload
// Usamos diskStorage y destination para guardar el archivo en /upload con el nombre original
var multerDiskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("Destination OK")

        callback(null, './upload');
    },
    filename: function (req, file, callback) {
        console.log("Filename OK")

        callback(null, file.originalname);
    }

});


function fileFilter(req, file, cb) {
    console.log("FileFilter OK");

    // Nombre original del archivo
    var fileName = file.originalname;
    console.log("The file name is <" + fileName + ">")

    // Extensión del archivo
    var extension = path.extname(file.originalname)
    console.log("The extension file is <" + extension + ">")

    // Quitamos el punto "." que precede de la extensión para poder filtrar mejor por extensión en el if
    // Pasamos la extensión a minúsculas para evitar problemas con extensiones en mayúsculas
    var extensionWithoutDot = extension.replace(".", "").toLowerCase();
    console.log("Extension If: <" + extensionWithoutDot + ">")

    // Variable que contiene un array con als extensiones permitidas
    var extensionsAllowed = ["jpg", "jpeg", "png", "gif"];

    // Filtramos para comprobar si el archivo contiene una extensión permitida para subir al servidor
    if (extensionsAllowed.indexOf(extensionWithoutDot) >= 0) {

        cb(null, true);

    } else {

        cb(null, false);

    }
}

module.exports = {
    multerDiskStorage, fileFilter
}