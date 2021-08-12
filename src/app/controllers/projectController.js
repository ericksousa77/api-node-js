const express = require('express');




class projectController {

    async create(req, res){
        res.status(201).send({ok: true, user: req.userId});
    }
}

module.exports = projectController;