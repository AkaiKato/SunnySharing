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

    await $.post('/getoneUser', { id: localStorage.getItem("userID") }, function(responce) {
        processDataUser(responce);
    })

    await $.post('/getCurrentContract', { userID: localStorage.getItem("userID"), active: true }, function(responce) {
        processDataDate(responce)
    })

    var imgPath

    await $.post('/getoneCar', { id: localStorage.getItem("carID") }, function(responce) {
        imgPath = responce.map(data => data.imgOfCar);
        processDataCar(responce);
    })
    await $.post('/getImg', { img: imgPath }, function(responce) {
        $('.img_img').attr('src', "data:image/jpeg/png;base64," + responce)
    })
}

const processDataUser = (data) => {
    $('.name').text(data.map(data => data.name));
    $('.surname').text(data.map(data => data.surname));
    $('.fathername').text(data.map(data => data.fathername));
    $('.number').text(data.map(data => data.number));
}

const processDataDate = (data) => {
    var dateBeg = new Date(data.map(data => data.dateOfBegin))
    var dateEnd = new Date(data.map(data => data.dateOfEnd))
    var options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
    };
    $('.dateBegin').text(dateBeg.toLocaleString("ru", options))
    $('.dateEnd').text(dateEnd.toLocaleString("ru", options))
}

const processDataCar = (data) => {
    $('.brand').text(data.map(data => data.brand));
    $('.model').text(data.map(data => data.model));
    $('.registMark').text(data.map(data => data.registMark));
    $('.color').text(data.map(data => data.color));
    $('.mileage').text(data.map(data => data.mileage));
    $('.transmission').text(data.map(data => data.transmission));
    $('.engineType').text(data.map(data => data.engineType));
    $('.bodyType').text(data.map(data => data.bodyType));
}

$('.btn_back').on('click', function() {
    location.href = '/map'
})

$(window).on('load', readyFn)