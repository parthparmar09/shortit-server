const express = require("express");
const mongoose = require("mongoose");
const app = express();
const URL = require("./url_model");
require("dotenv").config();
const cors = require('cors');
const corsOptions = {
  origin: 'https://shortit-pp.netlify.app',
  methods: 'GET,POST',
};
app.use(cors());

app.use(express.json());
//function to start the server
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(process.env.PORT, () => {
      console.log("server online...");
    });
  } catch (error) {
    console.log(error);
  }
};
//calling the function to start the server
start();

app.post("/shorten/", async (req, res) => {
  try {
    const url = req.body.url;
    const id = generateID();

    const urlObj = await URL.create({
      id,
      url,
    });

    if (urlObj) {
      shortUrl = `${process.env.BASE_URL}/${id}`;
      return res.status(400).json({
        success: true,
        url: shortUrl,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "an error occured, please try again",
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const urlObj = await URL.findOne({id});
    if (urlObj.url) {
      return res.redirect(urlObj.url);
    }

    return res
    .status(404)
    .send("<h1>Page Not Found</h1><h3>Invalid or Expired URL</h3>");

  } catch (error) {
    return res
      .status(404)
      .send("<h1>Page Not Found</h1><br/><h3>Invalid or Expired URL</h3>");
  }
});

const generateID = () => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890";
  let id = "";

  for (let i = 0; i < 8; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return id;
};
