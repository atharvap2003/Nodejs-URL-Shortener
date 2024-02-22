const express = require("express");
const path = require("path");

const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const { handleRedirectToOrigin } = require("./controllers/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8002;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log(`MongoDB connected!!`))
  .catch((err) => console.log(`Error Message: ${err}`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false})); //which will convert incoming bodies and parse it.
app.use("/url", urlRoute);
app.use("/", staticRoute);


app.get("/url/:shortid", handleRedirectToOrigin);

app.listen(PORT, () => console.log(`Server Started At Port: ${PORT}`));
