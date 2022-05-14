var mongoose = require("mongoose")

var TechSupportSchema = mongoose.Schema({
    surname: String,
    name: String,
    fathername: String,
    number: String,
    login: String,
    password: String,
});

var TechSupports = mongoose.model("TechSupport", TechSupportSchema);
module.exports = TechSupports;