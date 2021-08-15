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
router.post('/projects/create', authMiddleware , projectController.create);

router.get('/projects/:projectId', authMiddleware, projectController.show);
router.get('/projects', authMiddleware, projectController.list);

router.put('/projects/:projectId', authMiddleware, projectController.update);

router.delete('/projects/:projectId', authMiddleware, projectController.delete);


//rotas de user
router.post('/auth/create',authController.create);
router.post('/auth/authenticate',authController.authenticated);


//rotas de password control
router.post('/auth/forgot_password', forgotPasswordController.forgot);

router.post('/auth/reset_password', forgotPasswordController.resetPassword);


export default router; 