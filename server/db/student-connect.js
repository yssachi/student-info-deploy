const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url)
    .then(()=> console.log('Connected to the db'))
    .catch((err)=> console.log('Canot connect to the db',err))
}

module.exports = connectDB;


// mongodb://yssa:test123@nodeexpressproject-shard-00-00.uhaczhq.mongodb.net:27017,nodeexpressproject-shard-00-01.uhaczhq.mongodb.net:27017,nodeexpressproject-shard-00-02.uhaczhq.mongodb.net:27017/student-info?ssl=true&replicaSet=nodeexpressproject-shard-0&authSource=admin

// mongodb+srv://yssa:test123@nodeexpressproject.uhaczhq.mongodb.net/student-info?retryWrites=true&w=majority