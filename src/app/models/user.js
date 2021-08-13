import mongoose from '../../database';
import bcrypt from 'bcryptjs';


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
        select: false,        //quando buscar varios usuarios a senha não vem no array de usuarios

    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
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