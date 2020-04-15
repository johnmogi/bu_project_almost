const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");

const { port } = require("./config");

const server = express();

const authController = require("./controllers/users");
const vacsController = require("./controllers/vacations");
const filesController = require("./controllers/file-upload");

server.use(cors({ origin: `http://localhost:3001`, credentials: true })); // Need those exact configuration for the session cookie to be saved at client side.
// server.use(cors()); // Need those exact configuration for the session cookie to be saved at client side.
server.use(express.json());
server.use(
  expressSession({
    name: "VacationLoginCookie",
    secret: "have-a-nice-vacation",
    resave: true,
    saveUninitialized: false
  })
);

server.use("/api", vacsController);
server.use("/api/auth", authController);
server.use("/api/auth/file", filesController);

server.listen(port, () =>
  console.log(`Server Vacations running on port http://localhost:${port}`)
);
