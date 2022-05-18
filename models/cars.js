var mongoose = require("mongoose")

var carSchema = mongoose.Schema({
    brand: String,
    model: String,
    registMark: String,
    color: String,
    mileage: String,
    transmission: String,
    engineType: String,
    bodyType: String,
    PTS: String,
    parkingNumber: String,
    imgOfCar: String
});

var car = mongoose.model("cars", carSchema);
module.exports = car;