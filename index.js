const express = require('express')

const dotenv = require('dotenv')
dotenv.config()
const app = express()
const cors = require('cors')
const cookiesParser = require('cookie-parser')
const errorMiddleware = require("./middlewares/error");
const routes = require('./routes/routes')
const path = require("path");
const ConnectDB = require('./config/Db')

//=======Middllewares==============================
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use(cookiesParser())
// Middleware for Errors
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, "./static")));
//=======routes==============================
app.use('/api',routes)
app.get("/upload", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./static/index.html"));
  });
  

//========Listen App ===================================
ConnectDB()
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port number ${process.env.PORT}`)
})



