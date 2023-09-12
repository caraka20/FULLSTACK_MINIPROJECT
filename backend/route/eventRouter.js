const {eventController} = require("../controller")
const express = require("express")
const Route = express.Router()

Route.post("/createEvent", eventController.createEvent)
Route.post("/buyWithSaldo", eventController.buyWithSaldo)
Route.post("/buyWithPoint", eventController.buyWithPoint)
Route.get("/aplyReferal", eventController.applyReferal)
Route.get("/", eventController.getAllEvent)
// Route.get("/", eventController.filter)
Route.get("/detailEvent", eventController.detailEvent)
Route.post("/komentar", eventController.createReview)
Route.get("/komentar/:event_id", eventController.dataComments)
Route.put("/komentar/:idComent", eventController.updateComent)
Route.delete("/komentar/:idComent", eventController.deleteComent)

module.exports = Route