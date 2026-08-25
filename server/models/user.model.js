import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
     name:{
      type:String,
      required:[true,"Name is required"],
      trim:true,
      maxLength:[50,"Name cannot exceed 50 characters"]
     },
     email:{
      required:[true,"Email is required"],
      trim:true,
      lowercase:true,
      unique:true,
      match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email"]

     },
     password:{
      type:String,
      required:[true,"Password is required"],
      trim:true,
      minLength:[8,"Password must be 8 characters long"],
      select:false
     },
     role:{
        type:String,
        enum:{
            values:['student','instructor','admin'],
            message:"Please select a valid role"
        },
        default:'student'
     },
     avatar:{
        type:String,
        default:'default-avatar.png'
     },
     bio:{
        type:String,
        maxLength:[200,'Bio cannot exceed 200 characters']
     },
     enrolledCourses:[
        {
            course:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'
            },
            enrolledAt:{
                type:Date,
                default:Date.now
            }
        }
     ],
     createdCourses:[{
          type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
     }],
     resetPasswordToken:String,
     resetPasswordExpires:Date
},{
    timestamps:true
})

//hashing password
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10);
    next()
})

//compare password
userSchema.methods.comparePassword=async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
    this.resestpasswordExpire=Date.now()+10*60*1000
    return resetToken
}


export const User = mongoose.model("User",userSchema);