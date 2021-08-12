const express = require('express');

const AuthController = require('./controllers/authController');
//import { NaverController } from './controllers/NaverControllers';

const router = express.Router();

const authController = new AuthController();

router.get('/',(req,res)=>{
    res.send("Teste");
});

router.post('/create',authController.create);
//router.post("/storenaver", naverController.store);

module.exports = router;