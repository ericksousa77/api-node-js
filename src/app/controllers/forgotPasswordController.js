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
                return res.status(400).send({error: 'user not found!'});

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
            return res.status(400).send({error: 'erro on forgot password, try again'})

        }

    }

    async resetPassword(req, res){

        const { email, token, newpassword} = req.body;

        try{
            const user = await User.findOne({email})
            .select('+passwordResetToken passwordResetExpires');

            if(!user)
                return res.status(400).send({error: 'user not found!'});
            
            if(token !== user.passwordResetToken)
                return res.status(400).send({error: 'token invalid'});
            
            const now = new Date();

            if(now > user.passwordResetExpires)
                return res.status(400).send({error: 'token has expired, generate a new token'});

            user.password = newpassword;

            await user.save();

            return res.send("password is successfully modified");

        }catch(err){
            res.status(400).send({error: 'cannot reset password, try again'});
        }
    }
}

export default forgotPasswordController;