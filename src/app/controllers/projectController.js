import express from 'express';

import Project from '../models/project';
import Task from '../models/task';


class projectController {

    async create(req, res){
        try{

            const { title, description, tasks} = req.body;

            const project = await Project.create({title, description, user: req.userId});

            await Promise.all(tasks.map(async task => { //o project.save espera que todas as tasks sejam criadas e salvas, para so depois salvar o project
                const projectTask = new Task ({...task, project: project._id });

                await projectTask.save()

                project.tasks.push(projectTask);
                
            }));

            await project.save(); //atualizando as tasks no BD

            return res.send({ project});

        }catch(err){
            return res.status(400).send({ error: 'cannot create a project'});
        }
    }

    async list (req, res){
        try{

            const projects = await Project.find().populate(['user', 'tasks']); //populate pra trazer o nome de cada user

            return res.send({ projects });

        }catch{
            return res.status(400).send({ error: 'error loading projects'});

        }
    }

    async show(req, res){
        try{

            const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']); //populate pra trazer o nome de cada user

            return res.send({ project });

        }catch{
            return res.status(400).send({ error: 'error loading projects'});

        }
    }

    async update(req, res){
        try{

            const { title, description, tasks} = req.body;

            const project = await Project.findByIdAndUpdate(req.params.projectId,{
                title,
                description,
            }, {new: true});  //new true pro mongoose retornar o projeto atualizado

            project.tasks = [];

            await Task.remove({ project: project.id });

            await Promise.all(tasks.map(async task => { //o project.save espera que todas as tasks sejam criadas e salvas, para so depois salvar o project
                const projectTask = new Task ({...task, project: project._id });

                await projectTask.save()

                project.tasks.push(projectTask);
                
            }));

            await project.save(); //atualizando as tasks no BD

            return res.send({ project});

        }catch(err){
            return res.status(400).send({ error: 'cannot updating a project'});
        }
    }

    async delete(req, res){
        try{

            const project = await Project.findByIdAndRemove(req.params.projectId);

            return res.send("project deleted");

        }catch{
            return res.status(400).send({ error: 'error deleting projects'});

        }
    }
}

export default projectController;