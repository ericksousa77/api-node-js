const express = require('express');

const authMiddleware = require('./middlewares/auth');

const AuthController = require('./controllers/authController');
const ProjectController = require('./controllers/projectController');


/*import express from 'express';

import AuthController from ('./controllers/authController');
*/

const router = express.Router();

const authController = new AuthController();
const projectController = new ProjectController();


router.get('/',(req,res)=>{
    res.send("Teste");
});

router.get('/project/create', authMiddleware , projectController.create);


router.post('/auth/create',authController.create);

router.post('/auth/authenticate',authController.authenticated);
//router.post("/storenaver", naverController.store);

module.exports = router;