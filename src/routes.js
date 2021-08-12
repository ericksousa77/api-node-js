const express = require('express');
//import { NaverController } from './controllers/NaverControllers';

const router = express.Router();

//const naverController = new NaverController();

router.get('/',(req,res)=>{
    res.send("Teste");
});
//router.post("/storenaver", naverController.store);

module.exports = router;