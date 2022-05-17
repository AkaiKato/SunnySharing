var express = require("express"),
    http = require("http"),
    path = require('path'),
    app = express(),
    mongoose = require("mongoose"),
    UserController = require("./controllers/UserController"),
    TechSupportController = require("./controllers/TechsupportController"),
    AdministratorsController = require("./controllers/AdministratorsController")

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

app.post('/getUnacceptedUsers', (req, res) => {
    AdministratorsController.getUnacceptedUsers(req, res)
})

app.post('/acceptUser', (req, res) => {
    AdministratorsController.acceptUser(req, res)
})

app.post('/declineUser', (req, res) => {
    AdministratorsController.declineUser(req, res)
})

app.post('/upload', (req, res) => {
    imgPath = req.file.path //для того чтобы сохранить путь к файлу
})

app.post('/getImg', (req, res) => {
    fs.readFile(__dirname + '/uploads/filedata-1652800984232.png', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.write(Buffer.from(data).toString('base64'))
        res.end();
    });
})

//history

app.get("/history", (req, res) => {
    res.sendFile(path.join(staticPath, "html/history.html"))
})

//mainAdmin

app.get('/mainAdmin', (req, res) => {
    res.sendFile(path.join(staticPath, "html/mainAdmin.html"))
})


http.createServer(app).listen(3000);