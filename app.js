const express = require("express");
require('dotenv').config();
const cors = require("cors");
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const wishlistRoute = require("./routes/wishlist");
const userRoute = require("./routes/users");
const categoryRoute = require('./routes/categories');
const initializeConnectionDB = require("./models/DBconnection");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());

initializeConnectionDB();

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

// app.get('*', (req, res) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.get('/', (req, res) => {
  res.json({success: true, message: 'Prerogative ecommerce app server'});
})

app.use(bodyParser.json());
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/user", userRoute);
app.use('/category', categoryRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server started in " + PORT);
});
