require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
// USE v2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require("./db/connect");

// product router
const productRouter = require("./routes/productsRoutes");

// error handler
const notFoundMiddleWare = require("./middleware/not_found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("<h1> File Upload Starts here </h1>");
});

app.use("/api/v1/products", productRouter);

// middleware
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
