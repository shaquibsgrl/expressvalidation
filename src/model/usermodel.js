const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
{
firstName:{type:String,required:true},
lastName:{tyep:String,required:false},
email:{type:String,required:true},
password:{type:Number,required:true},
confirmpassword:{type:String,required:true},
age:{type:Number,required:true}
},
{
    versionKey:false,
    timestamps:true,
}
);

const User=mongoose.model("user",userSchema);

module.exports=User;