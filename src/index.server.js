const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const userRoutes=require('./routes/user');
const adminRoutes=require('./routes/admin/user');

//mongodb+srv://root:<password>@cluster0.pfi5w.mongodb.net/<dbname>?retryWrites=true&w=majority

env.config()
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pfi5w.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(()=>{
        console.log('Database connected');
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api',userRoutes);
app.use('/api',adminRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});