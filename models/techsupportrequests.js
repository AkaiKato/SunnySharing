var mongoose = require("mongoose")

var TechSupportReqSchema = mongoose.Schema({
    messageIn: String,
    messageOut: String,
    personId: String,
    status: Number,
    carID: String
});

var TechSupportReq = mongoose.model("TechSupportReq", TechSupportReqSchema);
module.exports = TechSupportReq;