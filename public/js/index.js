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
    } else if (data.admin) {
        localStorage.setItem("adminID", data.admin.map(admin => admin._id));
        localStorage.setItem("adminLogin", data.admin.map(admin => admin.login));
        location.replace('/administrators');
        return;
    } else if (data.tech) {
        localStorage.setItem("techID", data.tech.map(tech => tech._id));
        localStorage.setItem("techLogin", data.tech.map(tech => tech.login));
        location.replace('/worktechsupport');
        return;
    } else if (data.mAdmin) {
        localStorage.setItem("loginadmin", data.mAdmin.map(mAdmin => mAdmin.login));
        location.replace('/mainAdmin');
        return;
    }
    sessionStorage.user = JSON.stringify(data);
    location.replace('/map');
}

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}

$(".header-items").addClass('hide');