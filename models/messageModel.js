import mongoose from "mongoose";

const messageModelSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        text: {
            type: String,
            required: true
        }
    },
    users: Array,
},
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', messageModelSchema)
export default Message;