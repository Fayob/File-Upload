const path = require("path");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error-handlers");

const uploadProductImage = async (req, res) => {
  // check if file exist
  // check format
  // check size

  let productImage = req.files.image;

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
