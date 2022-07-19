import generateToken from '../config/generateToken.js';
import User from '../models/userModel.js';
import fs from 'fs';


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    try {

        if (!name || !email || !password)
            throw new Error('Please fill all fields!')

        var userExists = await User.findOne({ email });
        if (userExists)
            throw new Error("User already exists with same email!");

        userExists = await User.findOne({ name });
        if (userExists)
            throw new Error("User already exists with same name!");

        const user = await User.create({
            email,
            name,
            password,
        });

        if (!user)
            throw new Error("Failed to create the user!");

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "User has been registered!"
        })
    } catch (error) {

        // req.file && fs.unlink(req.file.path, error => { })
        console.log(error)
        res.status(400).json({ message: error.message })
    }
};


export const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            throw new Error("This email address is not registered!")

        const passwordIsValid = await user.matchPassword(password)

        if (!passwordIsValid)
            throw new Error("The password entered is incorrect!")

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAvatarImageSet: user.isAvatarImageSet,
            avatar: user.avatar,
            message: "User Signed in Sucessfully!",
            token: generateToken(user._id),
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


export const setAvatar = async (req, res) => {
    console.log(req.body)
    console.log(req.body.file)
    try {
        if (!req.body.file)
            throw new Error('Avatar not uploaded!')
        console.log('aa')
        const userId = req.params.id;
        const avatar = req.body.file;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatar
        }, { new: true });
        console.log(userData)
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatar
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}


export const allUsers = async (req, res) => {
    // const keyword = req.query.search && {
    //     $or: [
    //         { name: { $regex: req.query.search, $options: "i" } },
    //         { email: { $regex: req.query.search, $options: "i" } }
    //     ]
    // };
    // const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "name",
            "avatar",
            "_id"
        ]);
        console.log(users)
        return res.json(users);
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}