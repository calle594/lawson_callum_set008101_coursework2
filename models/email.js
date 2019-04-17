var mongoose=require("mongoose");

//Schema to store sent emails
    var EmailSchema= new mongoose.Schema({
        name:String,
        email:String,
        message:String
    });

module.exports= mongoose.model("Email",EmailSchema);
