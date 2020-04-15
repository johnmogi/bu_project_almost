//!!FIX ASAP **call for assistance

const fs = require("fs");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const uuid = require("uuid");

if (!fs.existsSync(__dirname + "\\uploads")) {
  fs.mkdirSync(__dirname + "\\uploads");
}

router.use(cors());
router.use(express.json());
router.use(fileUpload());
let nextID = 1;

router.post("/", (request, response) => {
  try {
    const product = request.body;
    product.id = nextID++;
    const file = request.files.image;
    console.log(file);
    // console.log(JSON.stringify(file));
    const extension = file.name.substr(file.name.lastIndexOf(".")); // E.g: ".jpg"
    file.mv("./uploads/" + uuid.v4() + extension); // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/api/uploads/:imgName", (request, response) => {
  response.sendFile(__dirname + "\\uploads\\" + request.params.imgName);
});

// const jwt = require("jsonwebtoken");
// const jwtLogic = require("../business-logic/jwt-logic");

// router.post("/", jwtLogic.verifyToken, (request, response) => {
// router.post("/", (request, response) => {
//   console.log(request.files);
//   try {
//     if (!request.files) {
//       response.status(400).send("No File Sent !");
//       return;
//     }

//     const file = request.files.image;
//     const randomName = uuid();
//     const extension = file.name.substr(file.name.lastIndexOf("."));
//     console.log(file);
//     file.mv(
//       "../client/public/assets/images/vacations/" + randomName + extension
//     );
//     console.log(randomName + extension);
//     response.status(201).json(randomName + extension);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

module.exports = router;
