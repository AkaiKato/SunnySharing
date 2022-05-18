const showtech = document.querySelector('.showtech');
const showtechsupportbtn = document.querySelector('.showtechsupportbtn');
const addworkers = document.querySelector('.addworkers');
const addworkerbtn = document.querySelector('.addworkerbtn');
const showadmins = document.querySelector('.showadmins');
const showadminsbtn = document.querySelector('.showadminsbtn');

const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

$("#user-history").addClass("hide");

$("#user-btn").on("click", function() {
    location.replace("/");
    localStorage.removeItem("loginadmin")
})


showtechsupportbtn.addEventListener('click', () => {
    $('.showtech').removeClass('hide')
    $('.showadmins').addClass('hide')
    $('.addworkers').addClass('hide')
});

showadminsbtn.addEventListener('click', () => {
    $('.showtech').addClass('hide')
    $('.showadmins').removeClass('hide')
    $('.addworkers').addClass('hide')

});

addworkerbtn.addEventListener('click', () => {
    $('.showtech').addClass('hide')
    $('.showadmins').addClass('hide')
    $('.addworkers').removeClass('hide')
});

window.onload = () => {
    showtech.classList.toggle('hide')
    if (localStorage.getItem("loginadmin") != null) {
        let user = localStorage.getItem("loginadmin")
        $('.account-info').text('Вы вошли как, ' + user);
        var getAdmins = { name: "all" }
        $.post("/getAllAdmins", getAdmins, function(responce) {
            responce.forEach(product => createPlateAdmin(product))
        })
        $.post("/getAllTechs", getAdmins, function(responce) {
            responce.forEach(product => createPlateTech(product))
        })
    } else {
        location.replace("/")
    }
}


$('#dropList').on('change', function() {
    if ($('#dropList option:selected').text() == "Администратор") {
        $("#numberAdd").prop("disabled", true)
    } else {
        $("#numberAdd").prop("disabled", false)
    }
})

$('.add_btn').on('click', function() {
    if ($('#dropList option:selected').text() == "Администратор") {
        if (!$("#surnameAdd").val() || !$("#nameAdd").val() || !$("#fatherNameAdd").val() ||
            !$("#loginAdd").val() || !$("#passwordAdd").val()) {
            showAlert("Заполните все поля!")
            return;
        }
    } else {
        if (!$("#surnameAdd").val() || !$("#nameAdd").val() || !$("#fatherNameAdd").val() ||
            !$("#numberAdd").val() || !$("#loginAdd").val() || !$("#passwordAdd").val()) {
            showAlert("Заполните все поля!")
            return;
        }
    }
    if (sessionStorage.id == null) {
        if ($('#dropList option:selected').text() == "Администратор") {
            var newAdmin = {
                surname: $("#surnameAdd").val(),
                name: $("#nameAdd").val(),
                fathername: $("#fatherNameAdd").val(),
                login: $("#loginAdd").val(),
                password: $("#passwordAdd").val()
            }
            $.post("/administratorsAdd", newAdmin, function(responce) {
                processData(responce);
            })
        } else {
            var newTech = {
                surname: $("#surnameAdd").val(),
                name: $("#nameAdd").val(),
                fathername: $("#fatherNameAdd").val(),
                number: $("#numberAdd").val(),
                login: $("#loginAdd").val(),
                password: $("#passwordAdd").val()
            }
            $.post("/techsupportAdd", newTech, function(responce) {
                processData(responce);
            })
        }
    } else {
        if ($('#dropList option:selected').text() == "Администратор") {
            var updateAdmin = {
                id: sessionStorage.id,
                surname: $("#surnameAdd").val(),
                name: $("#nameAdd").val(),
                fathername: $("#fatherNameAdd").val(),
                login: $("#loginAdd").val(),
                password: $("#passwordAdd").val()
            }
            $.post("/adminupdate", updateAdmin, function(responce) {
                sessionStorage.clear()
                location.href = '/mainAdmin';
            })
        } else {
            var updateTech = {
                id: sessionStorage.id,
                surname: $("#surnameAdd").val(),
                name: $("#nameAdd").val(),
                fathername: $("#fatherNameAdd").val(),
                number: $("#numberAdd").val(),
                login: $("#loginAdd").val(),
                password: $("#passwordAdd").val()
            }
            $.post("/techupdate", updateTech, function(responce) {
                sessionStorage.clear()
                location.href = '/mainAdmin';
            })
        }
    }
})

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
}


const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}

const setDataAdmin = (data) => {
    $('#surnameAdd').val(data.map(data => data.surname))
    $('#nameAdd').val(data.map(data => data.name))
    $('#fatherNameAdd').val(data.map(data => data.fathername))
    $('#dropList option:eq(2)').prop('selected', true)
    $('#dropList').prop('disabled', true)
    $('#loginAdd').val(data.map(data => data.login))
    $('#passwordAdd').val(data.map(data => data.password))
    $('.add_btn').text("Обновить");

    $('.showtech').addClass('hide')
    $('.showadmins').addClass('hide')
    $('.addworkers').removeClass('hide')

    $('.showtechsupportbtn').prop('disabled', true)
    $('.showadminsbtn').prop('disabled', true)
}

const setDataTech = (data) => {
    $('#surnameAdd').val(data.map(data => data.surname))
    $('#nameAdd').val(data.map(data => data.name))
    $('#fatherNameAdd').val(data.map(data => data.fathername))
    $('#dropList option:eq(1)').prop('selected', true)
    $('#dropList').prop('disabled', true)
    $('#numberAdd').val(data.map(data => data.number))
    $('#loginAdd').val(data.map(data => data.login))
    $('#passwordAdd').val(data.map(data => data.password))
    $('.add_btn').text("Обновить");

    $('.showtech').addClass('hide')
    $('.showadmins').addClass('hide')
    $('.addworkers').removeClass('hide')

    $('.showtechsupportbtn').prop('disabled', true)
    $('.showadminsbtn').prop('disabled', true)
}