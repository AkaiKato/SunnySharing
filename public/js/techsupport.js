const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');


var unidentified = ['Неопознанный слон', 'Неопознанный хорёк', 'Неопознанный гусь', 'Неопознанная сова', 'Неопознанный тигр', 'Неопознанный хомяк', 'Неопознанный котик']

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

$("#user-history").on('click', function() {
    location.href = '/history'
})

$("#user-btn").on('click', function() {
    localStorage.removeItem('userID')
    localStorage.removeItem('userLogin')
    location.replace('/')
})

$(".btn_close").on('click', function() {
    location.replace('/')
})

window.onload = () => {
    if (localStorage.getItem("userID") == null) {
        var date = new Date
        localStorage.setItem("userID", date.getTime())
        localStorage.setItem("userLogin", unidentified[Math.floor((Math.random() * unidentified.length))])
    }
    checkReq()
    if (unidentified.indexOf(localStorage.getItem('userLogin')) != -1) {
        $("#user-history").addClass("hide")
        $('#user-btn').addClass('hide')
    } else {
        $("#user-history").removeClass("hide")
        $('#user-btn').removeClass('hide')
    }
    let user = localStorage.getItem("userLogin")
    $('.account-info').text('Вы вошли как, ' + user);

    checkResponse()
}

async function checkReq() {
    await $.post('/checkStatus', { 'userid': localStorage.getItem('userID'), 'status': 0 }, function(responce) {
        if (responce.True) {
            $(".send").addClass('hide')
            $(".answ").removeClass('hide')
        }
    })
}

$(".btn_send").on('click', function() {
    if (!$('#textArea').val()) {
        showAlert('Заполните форму!')
        return
    }
    var newReq = {
        'messageIn': $('#textArea').val(),
        'messageOut': "",
        'personId': localStorage.getItem('userID'),
        'status': 0,
        'carID': localStorage.getItem('carID') ? localStorage.getItem('carID') : ""
    }
    $.post('/createRequest', newReq, function(responce) {
        location.reload()
    })
})

async function checkResponse() {
    await $.post('/checkStatus', { 'userid': localStorage.getItem('userID'), 'status': 1 }, function(responce) {
        if (responce.True) {
            $(".send").addClass('hide')
            $(".answ").removeClass('hide')
            $('#texAreaAnsw').prop('disabled', false);
            $('#texAreaAnsw').val(responce.True.map(data => data.messageOut))
            $('#texAreaAnsw').prop('disabled', true);
        }
    })
}

async function checkStatus() {
    await $.post('/checkStatus', { 'userid': localStorage.getItem('userID'), 'status': 0 }, function(responce) {
        if (responce.True) {
            showAlert('Вы не можете создать пока новую заявку!')
        } else if (responce.False) {
            $.post('/checkStatus', { 'userid': localStorage.getItem('userID'), 'status': 1 }, function(responce) {
                if (responce.True) {
                    $.post('/updateStatus', {
                        '_id': responce.True.map(data => data._id),
                        'status': 2
                    }, function() {
                        location.reload()
                    })
                }
            })
        }
    })
}

$('.btn_made').on('click', function() {
    checkStatus();
})

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}