const express = require("express");

const {
  handlegenerateShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handlegenerateShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
