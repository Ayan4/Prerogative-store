const express = require("express");
require('dotenv').config();
const port = process.env.PORT;
const cors = require("cors");
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const wishlistRoute = require("./routes/wishlist");
const userRoute = require("./routes/users");
const initializeConnectionDB = require("./models/DBconnection");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());

initializeConnectionDB();

app.use(bodyParser.json());
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log("server started in " + port);
});
