require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use("/user", userRoutes)

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3000 (3000 is in our .env file which is not accessible.)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))