var mongoose = require("mongoose")

var AdministratorSchema = mongoose.Schema({
    surname: String,
    name: String,
    fathername: String,
    login: String,
    password: String,
});

var Administrators = mongoose.model("Administrators", AdministratorSchema);
module.exports = Administrators;