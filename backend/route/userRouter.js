const express = require("express")
const {userController} = require("../controller")
const { editStatus } = require("../controller/userController")
const route = express.Router()
const {verify} = require("./../lib/jwt")

route.post("/register", userController.register)
route.get("/login", userController.login)
route.get("/dashboard/:id", userController.dashboard)
route.put('/auth', verify, userController.editStatus)

module.exports = route