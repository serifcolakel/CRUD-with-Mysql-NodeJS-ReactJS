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
  destination: "./images/user", // uploads ile images'e dosya gönderiyoruz
  filename: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      date = Date.now();
      return cb(null, `${date}_${file.originalname}`);
    } else {
      cb(
        new Error("Lütfen jpeg veya png formatında bir resim yükleyiniz."),
        null
      );
    }
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
}).single("image");

app.post("/api/image/user", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({
        message: err,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({
        message: "Bir hata oluştu.",
        err,
      });
    }
    // Everything went fine.
    res.send({
      image: date + "_" + req.file.originalname,
    });
  });
});

app.get("/api/image/user", (req, res) => {
  res.send({
    image: req.file.originalname,
  });
});

//--------------------------------------------------------------------------------

app.use("/api", require("./routes/api/users"));
app.use("/api", require("./routes/api/blogs"));
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
