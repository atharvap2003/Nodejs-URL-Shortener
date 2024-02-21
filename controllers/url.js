const shortid = require("shortid");
const URL = require("../models/url");
const { response } = require("express");

async function handlegenerateShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url required!!" });
  const shortID = shortid();
  console.log(shortID);

  try {
    await URL.create({
      shortId: shortID,
      redirectURL: body.url, // Make sure the field name matches the model
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handlegenerateShortURL,
  handleGetAnalytics,
};
