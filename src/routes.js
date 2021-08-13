/*const express = require('express');
const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/authController');
const ProjectController = require('./app/controllers/projectController');
*/


import express from 'express';
import AuthController from './app/controllers/authController';
import ProjectController from './app/controllers/projectController';
import ForgotPasswordController from './app/controllers/forgotPasswordController';
import authMiddleware from './app/middlewares/auth';


const router = express.Router();

const authController = new AuthController();
const projectController = new ProjectController();
const forgotPasswordController = new ForgotPasswordController();


router.get('/',(req,res)=>{
    res.send("Teste");
});

//rotas de project 
router.get('/project/create', authMiddleware , projectController.create);

//rotas de user
router.post('/auth/create',authController.create);
router.post('/auth/authenticate',authController.authenticated);

//rotas de forgot password
router.post('/auth/forgot_password', forgotPasswordController.forgot);


export default router; 