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

parkingsController.getOnePark = function(req, res) {
    parkings.findOne({ 'parkingNumber': req.body.parkingNumber }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

module.exports = parkingsController;