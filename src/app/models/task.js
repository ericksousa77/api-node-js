import mongoose from '../../database';


/*
Uma Task Possui:

- 1 project
- 1 user a quem ela foi atribuida

*/

const TaskSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true,
    
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    completed: {
        type: Boolean,
        require: true,
        default: false
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
    

});


const Task = new mongoose.model('Task', TaskSchema);

export default Task;