const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const {userRouter} = require("./route")
const {eventRouter} = require("./route")
app.use(express.json())

app.use("/users", userRouter)
app.use("/event", eventRouter)

app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const statusMessage = err.message || "ini error"
    return res.status(statusCode).send({
        isError : true,
        message : statusMessage,
        data : null
    })
})
app.listen(3001, () => {
    console.log("server sudah berjalan");
})