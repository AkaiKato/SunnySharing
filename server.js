var express = require("express"),
    http = require("http"),
    path = require('path'),
    app = express(),
    mongoose = require("mongoose"),
    UserController = require("./controllers/UserController")
    // SellerController = require("./controllers/seller_controller"),
    // ProductController = require("./controllers/product_controller")

var staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath));
app.use(express.json());
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

//history

app.get("/history", (req, res) => {
    res.sendFile(path.join(staticPath, "html/history.html"))
})


http.createServer(app).listen(3000);