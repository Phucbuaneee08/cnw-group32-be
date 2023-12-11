const mongoose = require("mongoose");

let dbConnect = () => {
    let connectOptions = process.env.DB_AUTHENTICATION === 'true' ?
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
        } : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
   

    // return mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority',
    //    connectOptions);
  //  return mongoose.createConnection('mongodb://127.0.0.1:27017/JadeHillHomestays',
  //       connectOptions);

    /* return mongoose.createConnection('mongodb://mongo-jadehills:27017/JadeHillHomestays',
        connectOptions); */

        const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/JadeHillHomestays', connectOptions);

    connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    return connection;

}
exports.db = dbConnect();