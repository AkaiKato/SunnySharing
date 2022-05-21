const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');

var flag;

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

$("#user-history").addClass("hide");

$("#user-btn").on("click", function() {
    location.replace("/");
    localStorage.removeItem("adminID");
    localStorage.removeItem("adminLogin");
})

$(".btn_request").on('click', () => {
    $('.main_requests').removeClass('hide')
    $('.main_show').addClass('hide')
    $('.main_add').addClass('hide')
})

$(".show_car").on('click', () => {
    $('.main_requests').addClass('hide')
    $('.main_show').removeClass('hide')
    $('.main_add').addClass('hide')
})

$(".add_car_btn").on('click', () => {
    $('.main_requests').addClass('hide')
    $('.main_show').addClass('hide')
    $('.main_add').removeClass('hide')
    flag = false
})


window.onload = () => {
    if (localStorage.getItem("adminID") != null) {
        $('.main_add').removeClass('hide')
        let user = localStorage.getItem("adminLogin")
        $('.account-info').text('Вы вошли как, ' + user);
        var getUnacceptedUsers = { name: "all" }
        $.post("/getUnacceptedUsers", getUnacceptedUsers, function(responce) {
            if (responce.AlertNp) {
                $('.emptyImg').removeClass('hide')
            } else {
                responce.forEach(product => createPlateUser(product))
            }
        })
        $.post("/getAllCars", { name: "all" }, function(responce) {
            responce.forEach(product => createPlateCar(product))
        })
    } else {
        location.replace("/")
    }
}

function previewFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.img_img_add').attr('src', e.target.result);
        };
        $('#btn').prop("disabled", false);
        reader.readAsDataURL(input.files[0]);
    }
}

$(".upl_btn").on('click', () => {
    flag = true;
})

$(".add_btn").on('click', () => {
    if (!$("#brand").val() || !$("#model").val() || !$("#registMark").val() ||
        !$("#color").val() || !$("#mileage").val() || !$("#transmission").val() ||
        !$("#engineType").val() || !$("#bodyType").val() || !$("#PTS").val() ||
        !$("#parkingNumber").val() || flag == false) {
        showAlert("Введите все значения!");
        return;
    }
    if (sessionStorage.getItem('carId' == null)) {
        var addCar = {
            brand: $("#brand").val(),
            model: $("#model").val(),
            registMark: $("#registMark").val(),
            color: $("#color").val(),
            mileage: $("#mileage").val(),
            transmission: $("#transmission").val(),
            engineType: $("#engineType").val(),
            bodyType: $("#bodyType").val(),
            PTS: $("#PTS").val(),
            parkingNumber: $("#parkingNumber").val(),
        }
        $.post("/addCar", addCar, function(responce) {
            console.log(responce)
        })
        location.reload()
    } else {
        var updCar = {
            id: sessionStorage.id,
            brand: $("#brand").val(),
            model: $("#model").val(),
            registMark: $("#registMark").val(),
            color: $("#color").val(),
            mileage: $("#mileage").val(),
            transmission: $("#transmission").val(),
            engineType: $("#engineType").val(),
            bodyType: $("#bodyType").val(),
            PTS: $("#PTS").val(),
            parkingNumber: $("#parkingNumber").val(),
            imgOfCar: sessionStorage.getItem('carPath')
        }
        $.post("/updateCar", updCar, function(responce) {
            console.log(responce)
        })
        location.href = '/administrators';
        sessionStorage.clear()
    }
})

async function setDataCar(data) {
    $('#brand').val(data.map(data => data.brand))
    $('#model').val(data.map(data => data.model))
    $('#registMark').val(data.map(data => data.registMark))
    $('#color').val(data.map(data => data.color))
    $('#mileage').val(data.map(data => data.mileage))
    $('#transmission').val(data.map(data => data.transmission))
    $('#engineType').val(data.map(data => data.engineType))
    $('#bodyType').val(data.map(data => data.bodyType))
    $('#PTS').val(data.map(data => data.PTS))
    $('#parkingNumber').val(data.map(data => data.parkingNumber))

    sessionStorage.setItem("carPath", data.map(data => data.imgOfCar))

    await $.post('/getImg', { img: data.map(data => data.imgOfCar) }, function(responce) {
        $('.img_img_add').attr('src', "data:image/jpeg/png;base64," + responce)
    })

    $('.add_btn').text("Обновить");

    $('.main_requests').addClass('hide')
    $('.main_show').addClass('hide')
    $('.main_add').removeClass('hide')

    $('.btn_request').prop('disabled', true)
    $('.show_car').prop('disabled', true)
    flag = true
}