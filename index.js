const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json());

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

//MongoDB database
    mongoose.connect("mongodb+srv://LuisPaulo:admin123@cluster0.aere8.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0"
, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};