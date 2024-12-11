import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    // assignment model
});

assignmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
