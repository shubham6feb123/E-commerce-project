const express = require('express');
const mongoose = require('mongoose');
const app  = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const fs = require('fs')
const CORS = require('cors');

//connecting server to database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true, 
}).then((rsponse) =>{console.log("connected to mongo")}).catch((error)=>{});

//middlewares
//-->json body parser middleware
app.use(express.json({ limit: "10mb" }));
//-->cors
app.use(CORS());

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({limit:'50mb',extended:true}))

//router middleware
//importing all files from auth directory using fs node module using map method
fs.readdirSync('./routes').map(r=>{app.use('/api',require("./routes/"+r))});



app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})