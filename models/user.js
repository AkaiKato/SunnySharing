var mongoose = require("mongoose")

var UserSchema = mongoose.Schema({
    surname: String,
    name: String,
    fathername: String,
    number: String,
    birthday: Date,
    login: String,
    password: String,
    passportNumber: Number,
    passportSeries: Number,
    passportIsued: String,
    passportDate: Date,
    licenseNumber: Number,
    licenseDate: Date,
    accepted: Boolean
});

var User = mongoose.model("User", UserSchema);
module.exports = User;