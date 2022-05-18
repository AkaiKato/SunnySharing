var mongoose = require("mongoose")

var parkingSchema = mongoose.Schema({
    parkingNumber: Number,
    parkingStreet: String,
    parkingBuilding: String
});

var parking = mongoose.model("parkings", parkingSchema);
module.exports = parking;