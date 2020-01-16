const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.status(200).json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiGitResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = apiGitResponse.data;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const techsArr = parseStringAsArray(techs);

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArr,
        location
      });
    }
    return res.status(201).json(dev);
  }
};
