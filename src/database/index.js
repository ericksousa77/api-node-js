import mongoose from 'mongoose';

//import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true }); //forma de conectar com o mongo

mongoose.connect('mongodb://localhost/noderest'); //forma de conectar com o mongo

mongoose.Promise = global.Promise;

export default mongoose;


