import mongoose  from "mongoose";

const lectureSchema= new mongoose.Schema({
    title:{
    type:String,
      required:[true,"Title is required"],
      trim:true,
      maxLength:[100,"Name cannot exceed 100 characters"]
   } ,
    description:{
    type:String,
      required:[true,"Description is required"],
      trim:true,
      maxLength:[500,"Description cannot exceed 500 characters"]
   } ,
   videoUrl:{
         type:String,
      required:[true,"Video is required"],
   } ,
   duration:{
    type:Number,
    default:0
   },
   publicId:{
    type:String,
     required:[true,"PublicId is required"]
   },
   isPreview:{
    type:Boolean,
    default:false
   },
   order:{
    type:Number,
    required:[true,"Lecture order is required"]
   }
},
{timestamps:true})



export const Lecture= mongoose.model("Lecture",lectureSchema);