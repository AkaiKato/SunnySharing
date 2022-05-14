var TechSupport = require("../models/techsupport"),
    TechController = {},
    mongoose = require("mongoose");

TechController.create = function(req, res) {
    var newTech = new TechSupport({
        surname: req.body.surname,
        name: req.body.name,
        fathername: req.body.fathername,
        number: req.body.number,
        login: req.body.login,
        password: req.body.password
    });
    newTech.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

TechController.getAll = function(req, res) {
    TechSupport.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result)
        }
    })
}

TechController.deleteById = function(req, res) {
    var id = req.body.id;
    TechSupport.find({ "_id": id }).remove().exec();
    res.json('success')
}

TechController.getOne = function(req, res) {
    var id = req.body.id;
    TechSupport.find({ "_id": id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

TechController.update = function(req, res) {
    var id = req.body.id;
    TechSupport.findOneAndUpdate({ "_id": id }, { "surname": req.body.surname, "name": req.body.name, "fathername": req.body.fathername, "number": req.body.number, "login": req.body.login, "password": req.body.password }, { new: true }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

module.exports = TechController;