import mongoose from 'mongoose';

const msgSchema = { msg: 'string', time: 'number', user: 'string' };

const Message = mongoose.model('Message', msgSchema);

export default Message;