const path = require("path");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error-handlers");

const uploadProductImage = async (req, res) => {
  // check if file exist
  // check format
  // check size

  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload an Image");
  }

  const maxSize = 10000;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload an image smaller than 10KB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
