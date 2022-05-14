var Administrator = require("../models/administrators"),
    AdministratorController = {},
    mongoose = require("mongoose");

AdministratorController.create = function(req, res) {
    var newAdm = new Administrator({
        surname: req.body.surname,
        name: req.body.name,
        fathername: req.body.fathername,
        login: req.body.login,
        password: req.body.password
    });
    newAdm.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

AdministratorController.getAll = function(req, res) {
    Administrator.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result)
        }
    })
}

AdministratorController.deleteById = function(req, res) {
    var id = req.body.id;
    Administrator.find({ "_id": id }).remove().exec();
    res.json('success')
}

AdministratorController.getOne = function(req, res) {
    var id = req.body.id;
    Administrator.find({ "_id": id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

AdministratorController.update = function(req, res) {
    var id = req.body.id;
    Administrator.findOneAndUpdate({ "_id": id }, { "surname": req.body.surname, "name": req.body.name, "fathername": req.body.fathername, "login": req.body.login, "password": req.body.password }, { new: true }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

module.exports = AdministratorController;