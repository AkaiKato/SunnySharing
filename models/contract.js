var mongoose = require("mongoose")

var contractSchema = mongoose.Schema({
    userID: String,
    carID: String,
    dateOfBegin: Date,
    dateOfEnd: Date,
    tariff: String,
    price: String,
    active: Boolean
});

var contract = mongoose.model("contract", contractSchema);
module.exports = contract;