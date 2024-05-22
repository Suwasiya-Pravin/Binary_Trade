const express = require('express');
const app= express();
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
require('./db/conn') //require connection to atlas
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/users",require('./router/user'));
app.use("/api/v1/projects",require('./router/project'));
app.use("/api/v1/category",require('./router/category'));
app.use("/api/v1/order",require('./router/order'));
app.use("/api/v1/contact",require('./router/contact'));

const PORT = process.env.PORT;
