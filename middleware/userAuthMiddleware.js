import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token)
            throw new Error("Token not provided!!");
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!token)
            throw new Error("Invalid Token!!");

        req.user = await User.findById(decodedToken.id).select("-password");

        next();


    } catch (error) {
        res.status(403).json({ message: error });
    }

}

export default userAuthMiddleware;