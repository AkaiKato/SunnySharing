$(".submit-btn").on("click", function() {
    if (!$("#login").val() || !$("#password").val()) {
        showAlert("Введите все данные!");
        return;
    }
    var checkUser = {
        login: $("#login").val(),
        password: $("#password").val()
    }
    $.post("/UserLogin", checkUser, function(response) {
        processDataLogIn(response);
    })
})

const processDataLogIn = (data) => {
    if (data.alert) {
        showAlert(data.alert);
        return;
    }
    sessionStorage.user = JSON.stringify(data);
    location.href = '/map';
}

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null)
    if (user != null) {
        $('.account-info').text('Вы вошли как, ' + user.map(user => user.login));
        $("#user-history").on('click', function() {
            location.href = '/history';
        })
        $("#user-btn").on('click', function() {
            sessionStorage.clear();
            location.href = '/';
        })
    } else {
        $(".header-items").addClass('hide');
    }
}