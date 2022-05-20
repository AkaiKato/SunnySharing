var TechSupport = require("../models/techsupport"),
    TechSupportReq = require("../models/techsupportrequests"),
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

TechController.createRequest = function(req, res) {
    var newTechRequest = new TechSupportReq({
        messageIn: req.body.messageIn,
        messageOut: req.body.messageOut,
        personId: req.body.personId,
        status: req.body.status,
        carID: req.body.carID
    });
    newTechRequest.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

TechController.checkStatus = function(req, res) {
    TechSupportReq.find({ $and: [{ "personId": req.body.userid, "status": req.body.status }] }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else if (result != 0) {
            console.log(result);
            res.json(200, { 'True': result });
        } else {
            res.json(200, { 'False': result });
        }
    })
}

TechController.updateStatus = function(req, res) {
    TechSupportReq.findByIdAndUpdate({ "_id": req.body._id }, { "status": req.body.status }, { new: true }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else if (result != 0) {
            console.log(result);
            res.json(200, { 'True': result });
        } else {
            res.json(200, { 'False': result });
        }
    })
}

TechController.getAllRequests = function(req, res) {
    TechSupportReq.find({ "status": req.body.status }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else if (result != 0) {
            console.log(result);
            res.json(200, result);
        } else {
            res.json(200, { "AlertNr": result })
        }
    })
}

TechController.answerFromTech = function(req, res) {
    TechSupportReq.findByIdAndUpdate({ "_id": req.body._id }, { "messageOut": req.body.messageOut, "status": req.body.status }, { new: true }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else if (result != 0) {
            console.log(result);
            res.json(200, result);
        }
    })
}

module.exports = TechController;