import mongoose from "mongoose";

const url = "";

export const connectDb = () => {
    try{
        mongoose.connect(url).then((res)=> {
            console.log("Connected to db using mongoose");
        })
    } catch (e){
        console.log("Error occurred while connecting to mongoDB", e);
    }
}

