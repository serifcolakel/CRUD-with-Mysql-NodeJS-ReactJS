const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
app.use(cors());
app.use(express.json());

//--------------------------------------------------------------------------------
// Multer
// /images path'e ulaşabilir olması için
app.use("/images", express.static("images"));

let date = "";
const storage = multer.diskStorage({
  destination: "./images", // uploads ile images'e dosya gönderiyoruz
  filename: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      date = Date.now();
      return cb(null, `${date}_${file.originalname}`);
    } else {
      cb(new Error("Image type must be jpeg/png file."), null);
    }
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
});

app.post("/api/image", upload.single("image"), (req, res) => {
  res.send({
    image: date + "_" + req.file.originalname,
  });
});

app.get("/api/image", (req, res) => {
  res.send({
    image: req.file.originalname,
  });
});

//--------------------------------------------------------------------------------

app.use("/api", require("./routes/api/users"));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
