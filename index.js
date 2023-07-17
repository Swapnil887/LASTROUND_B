const exp = require("constants")
const express = require("express")
const { connection } = require("./config/db")


const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.json("welcome")
})

app.listen(8080,async()=>{
    await connection
    console.log("server is running")
})