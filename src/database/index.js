const mongoose = require('mongoose');

//import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true }); //forma de conectar com o mongo

mongoose.Promise = global.Promise;

module.exports = mongoose;


