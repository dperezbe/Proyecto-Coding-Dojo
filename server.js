const express = require('express');
const conectarDB = require('./server/config/db');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const port = 8000;

// crear el servicor express
const app = express();
// conectar a la base de datos
conectarDB();

app.use(cookieParser());
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

require('./server/routes/routes.user')(app);
require('./server/routes/routers.apps')(app);


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))