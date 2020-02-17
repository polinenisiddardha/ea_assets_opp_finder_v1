const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Mydb", { useNewUrlParser: true}, { useUnifiedTopology: true }, (error)=>{
 
   if(!error)
   {
       console.log("Database connected successfully.");
   }
   else
   {
       console.log("Error connecting to database.");
   }
});

const User = require("./user.model")
const Process = require("./process.Model")