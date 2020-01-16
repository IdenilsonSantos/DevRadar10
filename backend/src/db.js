require('dotenv').config();
const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log('connected');
} catch (error) {
    console.log(error.message);
}


module.exports = mongoose;

