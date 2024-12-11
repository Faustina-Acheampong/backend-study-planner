import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    // course model
});

courseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
