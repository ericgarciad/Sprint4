const yargs = require('yargs');
let command = yargs.argv._[0]

/* Iniciamos la aplicaciones mediante el módulo app para mantener una mejor organización de la aplicación
y separamos lso archivos en carpetas (server.js en config, html en public y al iniciar la aplicación
mostrramos un mensaje de bienvenida y de como ponder interactuar con la aplicación
si se cumple el valor introducido por consola "server" se iniciará el servidor y podremos ver la
respuesta de la API en localhost:8000/ users o index.html o about.html..)
*/

if (command == 'server') {
    const server = require('./config/server');
    console.log("Starting server...");
    return server;
} else {
    console.log(`${colorMessage = "\x1b[32m"}
<-- Welcome to my Node REST Server -->

->>> If you want start server, enter <node app server> <<<-

-----------------------------------------------------------------

->>> GET /user url is: http://localhost:8000/v1/users/ <<<-

->>> Upload url is: http://localhost:8000/index.html, http://localhost:8000/about.html and http://localhost:8000/upload <<<-

${colorMessage = "\x1b[0m"} `);
}

