import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

export async function addMessage(req, res) {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) return res.status(200).json({ message: "Message added successfully" });
        return res.status(400).json({ message: 'Failed to add message to database' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};

export async function getAllMessage(req, res) {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        })
            .sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        console.log('projectMessages')
        console.log(projectMessages)
        res.json(projectMessages);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};









export async function accessChat(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            throw new Error("UserId param not sent with request!")
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email",
        });


        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: 'sender',
                isGroupChat: false,
                users: [req.user._id, userId],
            }

            try {
                const createdChat = await Chat.create(chatData);

                const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );

                res.status(200).send(fullChat);
            } catch (err) {
                res.send(400).send(err)
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

export async function fetchChat(req, res) {
    try {
        var chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })

        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name pic email"
        })

        res.status(200).send(chats);
    } catch (err) {
        res.status(400).send(err)
    }
}

export async function createGroupChat(req, res) {
    try {
        if (!req.body.users || !req.body.name) {
            throw new Error("Please fullfill all the fields!")
        }

        const users = JSON.parse(req.body.users);

        if (users.length < 2) {
            throw new Error("More than 2 users are required for group chat!");
        }

        users.push(req.user);

        const groupChat = await Chat({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat)
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function renameGroup(req, res) {
    const { id: _id } = req.params;
    chats.find((e) => e._id === _id) ? res.status(201).send(chats.find((e) => e._id === _id)) : res.status(201).send({ none: "none" })

}

export async function removeFromGroup(req, res) {
    const { id: _id } = req.params;
    chats.find((e) => e._id === _id) ? res.status(201).send(chats.find((e) => e._id === _id)) : res.status(201).send({ none: "none" })

}

export async function addToGroup(req, res) {
    const { id: _id } = req.params;
    chats.find((e) => e._id === _id) ? res.status(201).send(chats.find((e) => e._id === _id)) : res.status(201).send({ none: "none" })

}
