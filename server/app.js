const express = require('express');
const app= express();
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
require('./db/conn') //require connection to atlas
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/users",require('./router/user'));
app.use("/api/v1/projects",require('./router/project'));
app.use("/api/v1/category",require('./router/category'));

const PORT = process.env.PORT;

app.listen(4000,()=>{
    console.log(`server running at port ${PORT}`)
})