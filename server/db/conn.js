const mongoose=require('mongoose');
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const DB=process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log('connection succesfull')
}).catch((error)=>{
    console.log('no connection ')
})
