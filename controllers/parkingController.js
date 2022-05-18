var parkings = require("../models/parkings"),
    parkingsController = {}

parkingsController.create = function(req, res) {
    var parking = new parkings({
        parkingNumber: "",
        parkingStreet: "",
        parkingBuilding: ""
    });
    parking.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

module.exports = parkingsController;