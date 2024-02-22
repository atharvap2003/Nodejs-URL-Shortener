const express = require("express");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const {handleRedirectToOrigin} = require("./controllers/url");

const app = express();
const PORT = 8002;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log(`MongoDB connected!!`))
  .catch((err) => console.log(`Error Message: ${err}`));

app.set("view engine", "ejs");


app.use(express.json()); //which will convert incoming bodies and parse it.
app.use("/url", urlRoute);

app.get("/:shortid", handleRedirectToOrigin);

app.listen(PORT, () => console.log(`Server Started At Port: ${PORT}`));
