const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, 'User must have an email'],
    },
    fullName:{
        type:String,
        required: [true, 'User must have a name'],
    },
    password:{
        type:String,
        required: [true, 'User must have a password'],
        minlength: [5, 'Password must have 5 characters']
    },
    profilePic:{
        type:String,
        default:""
    },
},
{
    timestamps:true
}
);

const User = mongoose.model('User',UserSchema);
module.exports = User;