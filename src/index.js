const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection succesfully!");
  })
  .catch((e) => {
    console.log("Error", e);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.get('/api', (req, res) => {
    res.send('Hello, world!');
  });



/*  
app.post('/api/auth/sign-up', (req, res) => {
    console.log('Reqbody', req.body)
    // Handle sign-up logic here
    res.send('Sign-up successful');
});
*/
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});
