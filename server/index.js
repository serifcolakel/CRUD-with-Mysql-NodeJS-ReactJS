const express = require("express");
const app = express();
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const opt = require("./swagger.json");
const cors = require("cors");
const multer = require("multer");
const db = require("./config/mysqlOptions");
const jwt = require("jsonwebtoken");
const { validateToken } = require("./middlewares/loginMiddlewares");
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
  limits: { fileSize: 500000 },
}).single("image");

const options = {
  swaggerDefinition: opt,
  apis: ["./routes/api/*.js"],
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
};

app.post("/api/image/user", validateToken, (req, res) => {
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
app.post("/api/login", (req, res) => {
  const { userName, password } = req.body;
  const getUser = `SELECT * FROM user WHERE userName = ? AND password = ?;`;
  db.query(getUser, [userName, password], (err, resUser) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (resUser.length === 0) {
      return res.status(404).send({
        message: "Kullanıcı adı veya şifre hatalı.",
      });
    }
    const accessToken = jwt.sign({ ...resUser[0] }, process.env.SECRET_KEY, {
      expiresIn: "360s",
      algorithm: "HS256",
    });
    db.query(
      `SELECT * FROM auth WHERE user_id = ?`,
      [resUser[0].id],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else if (result === undefined || result.length === 0) {
          db.query(
            `INSERT INTO auth (user_id, token) VALUES (?, ?)`,
            [resUser[0].id, accessToken],
            (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              console.log("token eklendi");
              res.send({ token: `Bearer ${accessToken}` });
            }
          );
        } else {
          db.query(
            `UPDATE auth SET token = ? WHERE user_id = ?`,
            [accessToken, resUser[0].id],
            (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              console.log("UPDATED");
              res.send({ token: `Bearer ${accessToken}` });
            }
          );
        }
      }
    );

    // res.send({ token: `Bearer ${token}` });
  });
  // kontrol token var mı
});

app.use("/api", require("./routes/api/users"));
app.use("/api", require("./routes/api/blogs"));
app.use("/api", require("./routes/api/faqs"));
const specs = swaggerJsDoc(options);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      authAction: {
        JWT: {
          name: "JWT",
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "",
          },
          value: "Bearer <JWT>",
        },
      },
    },
  })
);
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
