import mongoose from 'mongoose';

const timeSchema = new mongoose.Schema({
    // time model
});

timeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Time = mongoose.model('Time', timeSchema);
export default Time;
