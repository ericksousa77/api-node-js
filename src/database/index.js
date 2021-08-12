const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true }); //forma de conectar com o mongo

mongoose.Promise = global.Promise;

module.exports = mongoose;


