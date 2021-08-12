const mongoose = require('../database');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        

    },

    email: {
        type:String,
        unique: true,
        require: true,
        lowercase: true
    },

    password: {
        type: String,
        require: true,
        selected: false,        //quando buscar varios usuarios a senha não vem no array de usuarios

    },

    createdAt:{
        type: Date,
        default: Date.now
    }
    

});

UserSchema.pre('save', async function (next){
    const hash = await bcrypt.hash(this.password, 10); //10 = qtd vezes que o hash vai rodar
    this.password = hash;
    next();
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;