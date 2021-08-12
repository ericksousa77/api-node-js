const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const JwtToken = require('../../services/jwtToken');


/*
import express from 'express';

import User from '../models/user';

import bcrypt from 'bcryptjs';
*/

class authController {

    async create (req, res){

        const {email} = req.body;

        try{

            if (await User.findOne({email}))
                return res.status(400).send({error: 'user already exists!'});

            
            const user = await User.create(req.body);

            user.password = undefined;  //removendo o password do retorno

            const jwtToken = new JwtToken();

            return res.status(201).send({
                user,
                token: jwtToken.generate({id: user.id})
            });
        }catch (err){
            return res.status(400).send({error: 'Resgistration failed'});
        }
    };

    async authenticated(req, res){

        const { email, password} = req.body;

        const user = await User.findOne({ email }).select('+password'); //checar se a senha esta correta

        if (!user){
            return res.status(400).send({error: 'user not found!'});
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'invalid password!'});
        }

        user.password = undefined;

        const jwtToken = new JwtToken();

        res.send({ 
            user,
            token: jwtToken.generate({id: user.id})
        });


        







    }

}

module.exports = authController;