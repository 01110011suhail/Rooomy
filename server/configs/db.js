 import mangoose from "mongoose";

 const connectDB = async () =>{
    try{
        mangoose.connection.on('connected', ()=> console.log("Database Connected")
    );
        await mangoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
    }catch (error){
        console.log(error.message);

    }
 }

 export default connectDB;