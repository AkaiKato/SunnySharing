var User = require("../models/user"),
    UserController = {},
    path = require('path'),
    mongoose = require("mongoose");

UserController.create = function(req, res) {
    var newUser = new User({
        surname: req.body.surname,
        name: req.body.name,
        fathername: req.body.fathername,
        number: req.body.number,
        birthday: req.body.birthday,
        login: req.body.login,
        password: req.body.password,
        passportNumber: req.body.passportNumber,
        passportSeries: req.body.passportSeries,
        passportIsued: req.body.passportIsued,
        passportDate: req.body.passportDate,
        licenseNumber: req.body.licenseNumber,
        licenseDate: req.body.licenseDate,
        accepted: req.body.accepted
    });
    newUser.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

UserController.check = function(req, res) {
    var number = req.body.number;
    var login = req.body.login;
    User.find({
        $or: [
            { "number": number },
            { "login": login }
        ]
    }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            return res.json({ 'alert': 'Такой номер или логин уже зарегистрирован в системе' });
        } else {
            res.json({ 'Good': "Good" });
        }
    })
}

UserController.login = function(req, res) {
    var login = req.body.login;
    var password = req.body.password;
    User.find({ "login": login, "password": password }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            return res.json(200, result)
        } else {
            return res.json({ 'alert': 'Такого пользователя нет в системе' });
        }
    });
}

module.exports = UserController;