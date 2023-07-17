const exp = require("constants")
const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRoute")
const { quizRouter } = require("./routes/quizRoute")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.json("welcome")
})


app.use("/user",userRouter)

app.use("/quiz",quizRouter)

app.listen(8080,async()=>{
    await connection
    console.log("server is running")
})