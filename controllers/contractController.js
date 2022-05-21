var contract = require("../models/contract"),
    contractCont = {}

contractCont.create = function(req, res) {
    var cont = new contract({
        userID: req.body.userID,
        carID: req.body.carID,
        dateOfBegin: req.body.dateOfBegin,
        dateOfEnd: req.body.dateOfEnd,
        tariff: req.body.tariff,
        price: req.body.price,
        active: req.body.active
    });
    cont.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

contractCont.getCurrentContract = function(req, res) {
    contract.find({ $and: [{ "userID": req.body.userID, "active": req.body.active }] }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

contractCont.endCurrentContract = function(req, res) {
    contract.findOneAndUpdate({ $and: [{ "userID": req.body.userID, "active": req.body.active }] }, { "active": false }, { new: true }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

contractCont.getAllEndedContracts = function(req, res) {
    contract.find({ "userID": req.body.id, "active": false }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else {
            console.log(result);
            res.json(200, result);
        }
    })
}

contractCont.checkcarContract = function(req, res) {
    contract.find({ $and: [{ "carID": req.body.carID, "active": true }] }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err)
        } else if (result != 0) {
            console.log(result);
            res.json(200, { 'True': result });
        } else {
            console.log(result);
            res.json(200, { 'False': result });
        }
    })
}

module.exports = contractCont;