const express = require('express');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();


app.use(morgan('dev'));
app.use(cors());  //recebe uma propriedade de dominio de origem
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(router);


app.listen(3333,()=>console.log("🔥 Server is running at: http://localhost:3333 🔥"));

