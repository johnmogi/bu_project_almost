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
router.post("/vacations", async (request, response) => {
  try {
    const vac = request.body;
    console.log(vac);
    const addedVac = await vacsLogic.addVacAsync(vac);
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
