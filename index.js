const express = require("express");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log(`MongoDB connected!!`))
  .catch((err) => console.log(`Error Message: ${err}`));

app.use(express.json()); //which will convert incoming bodies and parse it.
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started At Port: ${PORT}`));
