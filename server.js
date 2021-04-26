// Server

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors({
  origin: [
    "localhost:3000",
    "http://localhost:3000",
    "localhost:4000",
    "http://localhost:4000",
  ],
  origin: '*',
  allowedHeaders: ["Content-Type"],
  preflightContinue: true,
  credentials: true,
}
))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/launches", async (req, res) => {
  const page = req.query.page ? parseFloat(req.query.page) : 1;
  const offset = 50 * (page - 1);
  const { data } = await axios("https://api.spacexdata.com/v4/launches/past");
  const sliced = data.slice(offset, (offset + 50));
  const response = sliced.map(x => ({
    name: x.name,
    details: x.details,
    mission_patch: x.links.patch.large,
    mission_patch_small: x.links.patch.small,
    youtube_link: x.links.webcast,
  }));
  res.send(response);
});

app.get("/rockets", async (req, res) => {
  const { data } = await axios("https://api.spacexdata.com/v4/rockets");
  const response = data.map(x => ({
    name: x.name,
    description: x.description,
    cost_per_launch: x.cost_per_launch.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    rocket_pictures: x.flickr_images,
  }));
  res.send(response);
});

app.get("/launches/find/:name", async (req, res) => {
  const { data } = await axios("https://api.spacexdata.com/v4/launches/past");
  const response = data
    .filter(x => x.name.toLowerCase().includes(req.params.name.toLowerCase()))
    .map(x => ({
      name: x.name,
      details: x.details,
      mission_patch: x.links.patch.large,
      mission_patch_small: x.links.patch.small,
      youtube_link: x.links.webcast,
    }));
  res.send(response);
});

app.get("/rockets/find/:name", async (req, res) => {
  const { data } = await axios("https://api.spacexdata.com/v4/rockets");
  const response = data
    .filter(x => x.name.toLowerCase().includes(req.params.name.toLowerCase()))
    .map(x => ({
      name: x.name,
      description: x.description,
      cost_per_launch: x.cost_per_launch.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      rocket_pictures: x.flickr_images,
    }));
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
