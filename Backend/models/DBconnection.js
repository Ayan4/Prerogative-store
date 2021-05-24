const mongoose = require("mongoose");
require('dotenv').config();

const initializeConnectionDB = async () => {
  try{
    await mongoose
      .connect(
        `mongodb+srv://Ayan4:${process.env.MONGO_PWD}@cluster0.ziece.mongodb.net/prerogative?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      console.log('db connected');
      
    }catch(err){
      console.log("Error Occured in Estabilishing Connection" + err);
    }
};

module.exports = initializeConnectionDB;
