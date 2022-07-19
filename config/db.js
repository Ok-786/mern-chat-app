import mongoose from "mongoose";

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        console.log(conn.connection.host);
    } catch (error) {
        console.log(error);
    }

}

export default connect;