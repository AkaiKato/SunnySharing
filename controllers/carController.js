var Car = require("../models/cars"),
    carController = {},
    mongoose = require("mongoose");


carController.create = function(req, path, res) {
    var newCar = new Car({
        brand: req.body.brand,
        model: req.body.model,
        registMark: req.body.registMark,
        color: req.body.color,
        mileage: req.body.mileage,
        transmission: req.body.transmission,
        engineType: req.body.engineType,
        bodyType: req.body.bodyType,
        PTS: req.body.PTS,
        parkingNumber: req.body.parkingNumber,
        imgOfCar: path
    });
    newCar.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

carController.getAll = function(req, res) {
    Car.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else if (result.length != 0) {
            console.log(result);
            res.json(200, result)
        } else {
            res.json({ "AlertNp": 'no rq' })
        }
    })
}

carController.deleteById = function(req, res) {
    var id = req.body.id;
    Car.find({ "_id": id }).remove().exec();
    res.json('success')
}

carController.getOne = function(req, res) {
    var id = req.body.id;
    Car.find({ "_id": id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

carController.update = function(req, imgPath, res) {
    var id = req.body.id;
    console.log(req.body.id)
    if (imgPath != req.body.imgOfCar)
        req.body.imgOfCar = imgPath
    Car.findOneAndUpdate({ "_id": id }, {
        'brand': req.body.brand,
        'model': req.body.model,
        'registMark': req.body.registMark,
        'color': req.body.color,
        'mileage': req.body.mileage,
        'transmission': req.body.transmission,
        'engineType': req.body.engineType,
        'bodyType': req.body.bodyType,
        'PTS': req.body.PTS,
        'parkingNumber': req.body.parkingNumber,
        'imgOfCar': req.body.imgOfCar
    }, { new: true }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}


module.exports = carController;