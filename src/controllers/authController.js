const express = require('express');

const User = require('../models/user');

class authController {

    async create (req, res){

        const {email} = req.body;

        try{

            if (await User.findOne({email}))
                return res.status(400).send({error: 'user already exists!'});

            
            const user = await User.create(req.body);

            user.password = undefined;  //removendo o password do retorno

            return res.status(201).send({user});
        }catch (err){
            return res.status(400).send({error: 'Resgistration failed'});
        }
    }

}

module.exports = authController;