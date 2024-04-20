const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");
const app = express();

// middlewares
app.use(express.json());
// app.use(express.urlencoded( {extended: false} ));


// routes
app.use("/api/products", productRoute);



app.get('/', function (req, res) {
    res.send('Hello World')
});



mongoose.connect('mongodb+srv://yakzan:StRoNgPaSs-006@backenddb.uwwbyhh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
        console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Failed");
  });