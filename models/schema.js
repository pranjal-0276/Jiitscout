const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const buildingSchema=new Schema({
name:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true,
},
type:String,

image:{
    url:{
        type:String,
        default:"/images/default.jpeg",
        set:(v)=>v===""?"/images/default.jpeg":v,
    }
},
searchCount: {
  type: Number,
  default: 0
}
});

const Building=mongoose.model("Building",buildingSchema);

module.exports=Building;