var User = require("../models/user"),
    Admin = require("../models/administrators"),
    Tech = require("../models/techsupport"),
    mainAdmin = require("../models/mainAdmin"),
    UserController = {},
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
            return res.json(200, { 'user': result })
        } else {
            Tech.find({ "login": login, "password": password }, function(err, result) {
                if (err) {
                    console.log(err);
                    res.send(500, err);
                } else if (result.length != 0) {
                    return res.json(200, { 'tech': result })
                } else {
                    Admin.find({ "login": login, "password": password }, function(err, result) {
                        if (err) {
                            console.log(err);
                            res.send(500, err);
                        } else if (result.length != 0) {
                            return res.json(200, { 'admin': result })
                        } else {
                            mainAdmin.find({ "login": login, "password": password }, function(err, result) {
                                if (err) {
                                    console.log(err);
                                    res.send(500, err);
                                } else if (result.length != 0) {
                                    return res.json(200, { 'mAdmin': result })
                                } else {
                                    return res.json({ 'alert': 'Такого пользователя нет в системе' });
                                }
                            })
                        }
                    })
                }
            })
        }
    });
}

UserController.getoneUser = function(req, res) {
    User.find({ '_id': req.body.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            res.json(200, result);
        }
    })
}

UserController.checkAccept = function(req, res) {
    User.find({ $and: [{ '_id': req.body.id, 'accepted': 0 }] },
        function(err, result) {
            if (err) {
                console.log(err);
                res.send(500, err);
            } else if (result != 0) {
                res.json(200, { "False": 'result' });
            } else {
                res.json(200, { "True": result });
            }
        })
}

module.exports = UserController;