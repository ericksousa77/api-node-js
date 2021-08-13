import express from 'express';




class projectController {

    async create(req, res){
        res.status(201).send({ok: true, user: req.userId});
    }
}

export default projectController;