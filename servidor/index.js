const express = require('express');
const app = express();

const db = require('./db/index');
const morgan = require('morgan')
db.connectBD();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//rutas

app.use(require('./rutas/index'))

app.set('port',process.env.PORT || 3000)

app.listen(app.get('port'), ()=>{

    console.log('Server on port', app.get('port'))
   
})