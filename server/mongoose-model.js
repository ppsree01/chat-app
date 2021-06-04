import mongoose from 'mongoose';

const msgSchema = { msg: 'string', time: 'number', user: 'string' };

const Message = mongoose.model('Message', msgSchema);

const userSchema = {uid: 'string', pwd: 'string'};

const dataSchema = {rid: 'number', msg: 'string', date: 'string', time: 'string', tag: 'string', type: 'string'};

const model = {
    User: mongoose.model('User', userSchema),
    Data: mongoose.model('Data', dataSchema),
}

export default model;