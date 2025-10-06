const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

require('dotenv').config();

const app = express();

// const corsOptions = {
//     origin: ['http://localhost:3000', 'https://blogappapi-fznw.onrender.com', 'https://blog-app-virid-nine.vercel.app'],
//     credentials: true,
//     optionSuccessStatus: 200
// }

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

//MongoDB database
    mongoose.connect(process.env.MONGODB_STRING);

    mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};