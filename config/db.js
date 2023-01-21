const mongoose= require('mongoose');
MONGO_URI=process.env.MONGO_URI

const connectDB= async ()=>{

    await mongoose.connect(MONGO_URI)
    console.log("mongoDB connected ..")
}
module.exports= connectDB;