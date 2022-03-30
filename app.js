require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// error handler
const notFoundMiddleWare = require("./middleware/not_found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("<h1> File Upload Starts here </h1>");
});

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`The Server is listening on PORT ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
