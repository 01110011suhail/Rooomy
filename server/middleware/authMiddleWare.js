import User from "../models/User";

//Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    const{userID} = req.auth;
    if(!userID){
        res.json({success: false, message: "Not authorized"});
    }else{
        const user = await User.findById(userID);
        req.user = user;
        next();
    }
}