import express from 'express';

import Project from '../models/project';
import Task from '../models/task';


class projectController {

    async create(req, res){
        try{

            const project = await Project.create({...req.body, user: req.userId});

            return res.send({ project});

        }catch(err){
            return res.status(400).send({ error: 'cannot create a project'});
        }
    }

    async list (req, res){
        try{

            const projects = await Project.find().populate('user'); //populate pra trazer o nome de cada user

            return res.send({ projects });

        }catch{
            return res.status(400).send({ error: 'error loading projects'});

        }
    }

    async show(req, res){
        res.send({ user: req.userId });
    }

    async update(req, res){
        res.send({ user: req.userId });
    }

    async delete(req, res){
        res.send({ user: req.userId });
    }
}

export default projectController;