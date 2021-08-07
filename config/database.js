const mongoose = require('mongoose')

const DB_URL = "mongodb+srv://vraj:12345@school.wwhqd.mongodb.net/School?retryWrites=true&w=majority"

const connectDataBase = async () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => console.log('MongoDb is Connected'))
        .catch(err => console.log(err))
}

module.exports = connectDataBase;