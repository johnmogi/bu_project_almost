const express = require("express");
const vacsLogic = require("../database/vacations-logic");
const router = express.Router();

router.get("/home", (request, response) => {
  // Anonymous Users
  try {
    response.json({
      value:
        "Welcome To R.E.S.T - your one stop shop for tracking vacations in outer space...."
    });
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3000/api/vacations
router.get("/vacations", async (request, response) => {
  try {
    const vacs = await vacsLogic.getAllVacsAsync();
    response.json(vacs);
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// GET http://localhost:3000/api/vacations/1
router.get("/vacations/:id", async (request, response) => {
  try {

    const id = +request.params.id;
    const vac = await vacsLogic.getOneVacAsync(id);
    response.json(vac);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// try {
//   const upImage = request.body;
//   upImage.id = nextID++;
//   const file = request.files.image;

//   const extension = file.name.substr(file.name.lastIndexOf(".")); // E.g: ".jpg"
//   file.mv("./uploads/" + uuid.v4() + extension); // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
//   response.json(upImage);
// }
// catch (err) {
//   response.status(500).send(err.message);
// }
router.post("/vacations", async (request, response) => {
  try {
    const vac = request.body;
    
    const addedVac = await vacsLogic.addVacAsync(vac);
    console.log(JSON.stringify(addedVac));
    response.status(201).json(addedVac);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/vacations/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const vac = await vacsLogic.deleteOneVacAsync(id);
    response.json(vac);
  } catch (err) {
    response.status(200);
  }
});

module.exports = router;
