const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

$('#user-btn').on('click', function() {
    localStorage.removeItem('userID');
    localStorage.removeItem('userLogin');
    location.replace('/')
})

$('#user-history').on('click', function() {
    location.href = '/history'
})

async function readyFn(jQuery) {
    if (localStorage.getItem("userID") != null) {
        let user = localStorage.getItem("userLogin")
        $('.account-info').text('Вы вошли как, ' + user);
    } else {
        location.replace("/")
        return
    }
}

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}

$('.btnNext').on('click', function() {
    const inputs = document.body.querySelectorAll('[type=radio]');
    if (!Array.from(inputs).some(input => input.checked)) {
        showAlert('Выберите тариф');
        return;
    }
    var vl;
    Array.from(inputs).map(input => input.checked ? vl = input.value : "")
    createContract(vl)
})

async function createContract(forCont) {
    var dateOfB = new Date();
    var dateOfE = new Date();
    var tar
    if (forCont.split('_').pop() == 'sentry') {
        dateOfE.setHours(dateOfE.getHours() + 12)
        tar = "до 12 часов"
    } else if (forCont.split('_').pop() == 'daytime') {
        dateOfE.setHours(dateOfE.getHours() + 24)
        tar = "дневной"
    } else if (forCont.split('_').pop() == 'weekly') {
        dateOfE.setHours(dateOfE.getHours() + 168)
        tar = "недельный"
    } else if (forCont.split('_').pop() == 'monthly') {
        dateOfE.setMonth(dateOfE.getMonth() + 1)
        tar = "месячный"
    } else {
        return;
    }

    var contract = {
        userID: localStorage.getItem('userID'),
        carID: localStorage.getItem('carID'),
        dateOfBegin: dateOfB,
        dateOfEnd: dateOfE,
        tariff: tar,
        price: forCont.split('_')[0],
        active: true
    }
    await $.post('/createContract', contract, function(responce) {
        location.href = '/endOfFee'
    })
}

$(window).on('load', readyFn)