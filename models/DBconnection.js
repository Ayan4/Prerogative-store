const mongoose = require("mongoose");
require("dotenv").config();

const initializeConnectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    });
    console.log("db connected");
  } catch (err) {
    console.log("Error Occured in Estabilishing Connection - " + err);
  }
};

module.exports = initializeConnectionDB;
