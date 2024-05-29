const mongoose = require('mongoose');
const plm =require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/testingend2");

const userSchema =new mongoose.Schema({   //mongoose schema structure
username: String, 
password: String,
secret:String
// description:String,
// categories:{
//   type: Array,    //we can write as categories:[]
//   default:[]
// },
// datecreated:{
//   type: Date,
//   default: Date.now()
// },
});
userSchema.plugin(plm);
module.exports=mongoose.model("user",userSchema);