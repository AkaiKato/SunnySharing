const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');


userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

$("#user-history").addClass("hide");

$("#user-btn").on("click", function() {
    localStorage.removeItem("techID");
    localStorage.removeItem("techLogin");
    location.replace("/");
})

window.onload = () => {
    if (localStorage.getItem("techID") != null) {
        $('.main_add').removeClass('hide')
        let user = localStorage.getItem("techLogin")
        $('.account-info').text('Вы вошли как, ' + user);
        var getUsersReq = { status: 0 }
        $.post("/getAllRequests", getUsersReq, function(responce) {
            if (responce.AlertNr) {
                $('.main_requests').removeClass('hide')
            } else {
                responce.forEach(request => createPlateReq(request))
            }
        })
    } else {
        location.replace("/")
    }
}

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}

const answ_request = (data) => {
    if (!$("#" + data).val()) {
        showAlert("Заполните поле ответа!")
        return
    }
    $.post('/answerFromTech', { '_id': data, 'messageOut': $("#" + data).val(), 'status': 1 }, function(responce) {
        location.reload()
    })
}