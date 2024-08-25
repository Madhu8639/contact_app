import mongoose  from "mongoose";
const userSchema = mongoose.Schema({
    
    username:{
        type:String,
        required:[true, "please add the user name"],
    },
    email:{
        type:String,
        required:[true, "please add the email"],
        unique:[true, "email address already taken"]
    },
    password:{
        type:String,
        required:[true, "please add the user password"],
    }
},{
    timestamps:true
})

export default mongoose.model("User", userSchema)