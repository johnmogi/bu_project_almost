
const fs = require("fs");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const uuid = require("uuid");
// const uuid = require("uuid/v4");


if (!fs.existsSync(__dirname + "\\uploads")) {
  fs.mkdirSync(__dirname + "\\uploads");
}


router.use(cors());
router.use(express.json());
router.use(fileUpload());
let nextID = 1;


router.post("/", (request, response) => {
  console.log(file);
  console.log("enter")
  try {
    const upImage = request.body;
    upImage.id = nextID++;
    const file = request.files.image;

    const extension = file.name.substr(file.name.lastIndexOf(".")); // E.g: ".jpg"
    file.mv("./uploads/" + uuid.v4() + extension); // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
    response.json(upImage);
  }
  catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/api/uploads/:imgName", (request, response) => {
  response.sendFile(__dirname + "\\uploads\\" + request.params.imgName);
});


module.exports = router;
