const { Schema, model } = require('../db');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = model('Dev', DevSchema);