var express = require("express"),
    http = require("http"),
    path = require('path'),
    app = express(),
    mongoose = require("mongoose"),
    UserController = require("./controllers/UserController"),
    TechSupportController = require("./controllers/TechsupportController"),
    AdministratorsController = require("./controllers/AdministratorsController"),
    ParkingController = require("./controllers/parkingController"),
    carController = require("./controllers/carController"),
    ContractController = require("./controllers/contractController")

const multer = require("multer");
const fs = require("fs");
var staticPath = path.join(__dirname, "public");
var imgPath

app.use(express.static(staticPath));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.use(multer({ storage: storage }).single("filedata"));

app.use(express.urlencoded());
mongoose.connect('mongodb://localhost/SunnySharing', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});


//index

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "html/index.html"));
});

//signup

app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "html/signup.html"))
});

app.post("/signup", function(req, res) {
    UserController.create(req, res);
});

app.post("/checkUser", function(req, res) {
    UserController.check(req, res);
})

app.post("/UserLogin", function(req, res) {
    UserController.login(req, res);
})

//main

app.get("/map", (req, res) => {
    res.sendFile(path.join(staticPath, "html/main.html"))
})

app.post('/getOnePark', (req, res) => {
    ParkingController.getOnePark(req, res)
})

app.post('/checkAccept', (req, res) => {
    UserController.checkAccept(req, res)
})

//Q&A

app.get("/Q&A", (req, res) => {
    res.sendFile(path.join(staticPath, "html/Q&A.html"))
})

//techsupport

app.get("/techsupport", (req, res) => {
    res.sendFile(path.join(staticPath, "html/techsupport.html"))
})

app.get("/worktechsupport", (req, res) => {
    res.sendFile(path.join(staticPath, "html/workerstechsupport.html"))
})

app.post('/techsupportAdd', (req, res) => {
    TechSupportController.create(req, res);
})

app.post('/getAllTechs', (req, res) => {
    TechSupportController.getAll(req, res);
})

app.post('/delTech', (req, res) => {
    TechSupportController.deleteById(req, res);
})

app.post('/techgetone', (req, res) => {
    TechSupportController.getOne(req, res);
})

app.post('/techupdate', (req, res) => {
    TechSupportController.update(req, res);
})

//administrators

app.get('/administrators', (req, res) => {
    res.sendFile(path.join(staticPath, "html/admin.html"))
})

app.post('/administratorsAdd', (req, res) => {
    AdministratorsController.create(req, res);
})

app.post('/getAllAdmins', (req, res) => {
    AdministratorsController.getAll(req, res);
})

app.post('/delAdministrator', (req, res) => {
    AdministratorsController.deleteById(req, res);
})

app.post('/admingetone', (req, res) => {
    AdministratorsController.getOne(req, res);
})

app.post('/adminupdate', (req, res) => {
    AdministratorsController.update(req, res);
})

//requestsToSignUp

app.post('/getUnacceptedUsers', (req, res) => {
    AdministratorsController.getUnacceptedUsers(req, res)
})

app.post('/acceptUser', (req, res) => {
    AdministratorsController.acceptUser(req, res)
})

app.post('/declineUser', (req, res) => {
    AdministratorsController.declineUser(req, res)
})

//workWithImages

app.post('/upload', (req, res) => {
    imgPath = req.file.path //?????? ???????? ?????????? ?????????????????? ???????? ?? ??????????
        // res.send("dfg")
})

app.post('/getImg', (req, res) => {
    fs.readFile(__dirname + '\\' + req.body.img, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.write(Buffer.from(data).toString('base64'))
        res.end();
    });
})

//workWithCars

app.post('/addCar', (req, res) => {
    carController.create(req, imgPath, res)
})

app.post('/getAllCars', (req, res) => {
    carController.getAll(req, res)
})

app.post('/deleteCar', (req, res) => {
    carController.deleteById(req, res)
})

app.post('/getoneCar', (req, res) => {
    carController.getOne(req, res)
})

app.post('/updateCar', (req, res) => {
    carController.update(req, imgPath, res)
})

//techsupportRequests

app.post('/createRequest', (req, res) => {
    TechSupportController.createRequest(req, res)
})

app.post('/checkStatus', (req, res) => {
    TechSupportController.checkStatus(req, res)
})

app.post('/updateStatus', (req, res) => {
    TechSupportController.updateStatus(req, res)
})

app.post('/getAllRequests', (req, res) => {
    TechSupportController.getAllRequests(req, res)
})

app.post('/answerFromTech', (req, res) => {
    TechSupportController.answerFromTech(req, res);
})

//history

app.get("/history", (req, res) => {
    res.sendFile(path.join(staticPath, "html/history.html"))
})

//mainAdmin

app.get('/mainAdmin', (req, res) => {
    res.sendFile(path.join(staticPath, "html/mainAdmin.html"))
})

//fee

app.get('/fee', (req, res) => {
    res.sendFile(path.join(staticPath, "html/fee.html"))
})

app.post('/createContract', (req, res) => {
    ContractController.create(req, res)
})

//endOfFee

app.get('/endOfFee', (req, res) => {
    res.sendFile(path.join(staticPath, 'html/endOfFee.html'))
})

app.post('/getoneUser', (req, res) => {
    UserController.getoneUser(req, res);
})

app.post('/getCurrentContract', (req, res) => {
    ContractController.getCurrentContract(req, res)
})

app.post('/endCurrentContract', (req, res) => {
    ContractController.endCurrentContract(req, res)
})

app.post('/getAllEndedContracts', (req, res) => {
    ContractController.getAllEndedContracts(req, res)
})

app.post('/checkcarContract', (req, res) => {
    ContractController.checkcarContract(req, res)
})

http.createServer(app).listen(3000);