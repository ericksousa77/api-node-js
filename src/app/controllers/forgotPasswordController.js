import express from 'express';
import User from '../models/user';
import crypto from 'crypto';  //vem junto com o node
import mailer from '../../services/mailer';

class forgotPasswordController{

    async forgot(req, res){
        
        const { email } = req.body;

        try{

            const user = await User.findOne({email});

            if(!user)
                res.status(400).send({error: 'user not found!'});

            const token = crypto.randomBytes(20).toString('hex');  //token aleatorio para validar a mudança de senha

            const now = new Date();
            now.setHours(now.getHours() + 1); //tenho de expiração para mudança de senha = 1 hora a mais, a partir da requisicao
            
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: email,
                from: 'erick@erick123.com',
                template: 'auth/forgot_password',
                context: { token },
            }, (err) => {
                if (err){
                    console.log(err);
                    return res.status(400).send({ error: 'Cannot send forgot password email!' })
                }
                return res.send();
            })
            


        }catch (err){
            res.status(400).send({error: 'erro on forgot password, try again'})

        }

    }
}

export default forgotPasswordController;