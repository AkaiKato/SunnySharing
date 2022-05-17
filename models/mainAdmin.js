var mongoose = require("mongoose")

var mainAdminSchema = mongoose.Schema({
    login: String,
    password: String,
});

var mainAdmin = mongoose.model("mAdmins", mainAdminSchema);
module.exports = mainAdmin;