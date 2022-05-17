const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');

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
    $.post("/getImg", {}, function(responce) {
        console.log(responce)
        $(".img_img").attr('src', "data:image/jpeg;base64," + responce);
    })
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
})


window.onload = () => {
    if (localStorage.getItem("adminID") != null) {
        $('.main_requests').removeClass('hide')
        let user = localStorage.getItem("adminLogin")
        $('.account-info').text('Вы вошли как, ' + user);
        var getUnacceptedUsers = { name: "all" }
        $.post("/getUnacceptedUsers", getUnacceptedUsers, function(responce) {
                responce.forEach(product => createPlateUser(product))
            })
            // $.post("/getAllTechs", getAdmins, function(responce) {
            //     responce.forEach(product => createPlateTech(product))
            // })
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

var flag = false;

$(".upload-btn").on('click', () => {
    flag = true
})

$(".add_btn").on('click', () => {
    if (!$("#brand").val() || !$("#model").val() || !$("#registMark").val() ||
        !$("#color").val() || !$("#mileage").val() || !$("#transmission").val() ||
        !$("#engineType").val() || !$("#bodyType").val() || !$("#PTS").val() ||
        !$("#parkingNumber").val() || $(".img_img_add").attr('src') == "" || flag == false) {
        showAlert("Введите все значения!");
        return;
    }
    // $.post("/upload", f, function(responce) {
    // })
})

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}