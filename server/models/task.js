import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    // task model
});

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
