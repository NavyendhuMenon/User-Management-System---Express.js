const mongoose = require ("mongoose")

const userSchema = mongoose.Schema({

    name:{type:String, required: true },
    email:{type:String,unique:true, required: true },
    mobile:{type:Number,unique:true,required: true },
    password:{type:String},
    is_admin:{type:Boolean, default: false },
    // is_verified:{type:Number, default:0

    // }
    

});

const User= mongoose.model("User",userSchema)
module.exports= User;



