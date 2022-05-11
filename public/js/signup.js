$(".next-btn").on("click", function() {
    if (!$("#surname").val() || !$("#name").val() || !$("#fathername").val() || !$("#number").val() ||
        !$("#birthday").val() || !$("#login").val() || !$("#password").val()) {
        showAlert("Введите все данные!");
        return;
    }
    var checkUser = {
        login: $("#login").val(),
        number: $("#number").val()
    }
    $.post("/checkUser", checkUser, function(response) {
        processDataCheck(response);
    })
})

$(".submit-btn").on("click", function() {
    if (!$("#passportNumber").val() || !$("#passportSeries").val() || !$("#passportIsued").val() ||
        !$("#passportDate").val() || !$("#licenseNumber").val() || !$("#licenseDate").val()) {
        showAlert("Введите все значения!");
        return;
    }
    var newUser = {
        surname: $("#surname").val(),
        name: $("#name").val(),
        fathername: $("#fathername").val(),
        number: $("#number").val(),
        birthday: $("#birthday").val(),
        login: $("#login").val(),
        password: $("#password").val(),
        passportNumber: $("#passportNumber").val(),
        passportSeries: $("#passportSeries").val(),
        passportIsued: $("#passportIsued").val(),
        passportDate: $("#passportDate").val(),
        licenseNumber: $("#licenseNumber").val(),
        licenseDate: $("#licenseDate").val(),
        accepted: false
    }
    $.post("/signup", newUser, function(response) {
        processDataSignUp(response);
    })
})

const processDataCheck = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    $(".personData").addClass("hide");
    $(".docData").removeClass("hide");
}

const processDataSignUp = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    location.href = '/';
}

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}