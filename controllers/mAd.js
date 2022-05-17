var mainAdmin = require("../models/mainAdmin"),
    mCont = {}

mCont.create = function(req, res) {
    var mad = new mainAdmin({
        login: "admin",
        password: "admin",
    });
    mad.save(function(err, result) {
        console.log(err);
        if (err !== null) {
            res.json(500, err);
        } else {
            res.json(200, result);
            console.log(result);
        }
    });
}

module.exports = mCont;