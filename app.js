const express = require("express");
const app = express();
const path = require("path");
const Session = require("express-session");
const FileStore = require("session-file-store")(Session);
app.use(express.json());
const port = 3000;
app.use(
  Session({
    store: new FileStore({
      path: path.join(__dirname, "/tmp"),
      encrypt: true,
    }),
    secret: "Super Secret !",
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
);
const router = express.Router();

app.use("/", router);

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/session-in", (req, res) => {
  // Initialisation de la variable de sessions "song" avec TRUE
  req.session.song = "be bop a lula";
  res.sendStatus(200);
});

router.get("/session-out", (req, res) => {
  res.send(req.session.song);
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
