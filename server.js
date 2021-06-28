const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const user = require("./routes/userRoute");
const auth = require("./routes/authRoute");
const product = require("./routes/productRoute");
const cart = require("./routes/cartRoute");
const Fawn = require("fawn");

mongoose
  .connect("mongodb://localhost/accenture_node", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("database started successfully");
  })
  .catch((err) => {
    console.log("fail to connect", err);
  });

const allowedOrigins = [
  "http://localhost:8080",
  "https://7277c2e205c2.ngrok.io",
];

const options = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/product", product);
app.use("/api/cart", cart);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("3000 port is ready");
});
