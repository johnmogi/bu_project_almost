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
    const upImage = request.body;
    upImage.id = nextID++;
    const file = request.files.image;
    const extension = file.name.substr(file.name.lastIndexOf("."));
    file.mv("./uploads/" + uuid.v4() + extension);
    response.json(upImage);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/api/uploads/:imgName", (request, response) => {
  response.sendFile(__dirname + "\\uploads\\" + request.params.imgName);
});

module.exports = router;
