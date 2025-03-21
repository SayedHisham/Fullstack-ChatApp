const User = require('./../models/user');
const Message = require('./../models/message');
exports.getUSerforSidebar =async (req,res)=>{
    try{
        const loggedInuser = req.user._id;
        const filteredUsers = await User.find({_id:{ $ne:loggedInuser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch(err){
        console.error("Error in getUsersForSidebar: ", err.message);
        res.status(500).json({ error: "Internal server error" });
  }
    };

exports.getMessages = () => {
    try{
        const {id:userToChatId} = req.param;
        const senderId = req.user._id;
        const messages = Message.find({
            $or: [
            { senderId: senderId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: senderId },
          ]});
          res.status(200).json(messages);
    } catch(err){
        console.error("Error in getMessages: ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.sendMessages =async (req,res)=>{
    try{
        let imageUrl;
        const {text , image} = req.body;
        const senderId = req.user._id;
        const receiverId = req.param
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
            const newMessage = new Message ({
                senderId,
                receiverId,
                text,
                image: imageUrl,
            });
            await newMessage.save();
        }


    }catch(err){
        console.error("Error in send Messages: ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}