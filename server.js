const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const PORT = 3000 || process.env.PORT;

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("upload-images"), (req, res) => {
  if (req.file) {
    const pathName = req.file.path;
    res.status(201).send(req.file.filename);
  } else {
    res.send("Something went wrong");
  }
});
app.get("/", (req, res) => {
  res.send("Hello Bryan");
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
