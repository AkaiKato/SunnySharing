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

$('.btn_back').on('click', function() {
    location.href = '/map'
})

async function readyFn(jQuery) {
    if (localStorage.getItem("userID") != null) {
        let user = localStorage.getItem("userLogin")
        $('.account-info').text('Вы вошли как, ' + user);
    } else {
        location.replace("/")
        return
    }

    await $.post('/getCurrentContract', { userID: localStorage.getItem("userID"), active: true }, function(responce) {
        if (responce.length == 0) {
            $('.wrapper_main_content_active').addClass('hide')
        } else {
            var dateBeg = new Date(responce.map(data => data.dateOfBegin))
            var dateEnd = new Date(responce.map(data => data.dateOfEnd))
            var options = {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
            };
            $('.dateBeginAct').text(dateBeg.toLocaleString("ru", options))
            $('.dateEndAct').text(dateEnd.toLocaleString("ru", options))
            $.post('/getoneCar', { id: responce.map(data => data.carID) }, function(responce) {
                processDataCarAct(responce)
            })
        }
    })

    await $.post('/getAllEndedContracts', { id: localStorage.getItem('userID') }, function(responce) {
        responce.forEach(data => createHistoryCar(data))
    })
}

async function processDataCarAct(data) {
    $('.brandAct').text(data.map(data => data.brand));
    $('.modelAct').text(data.map(data => data.model));
    $('.registMarkAct').text(data.map(data => data.registMark));
    $('.colorAct').text(data.map(data => data.color));
    $('.mileageAct').text(data.map(data => data.mileage));
    $('.transmissionAct').text(data.map(data => data.transmission));
    $('.engineTypeAct').text(data.map(data => data.engineType));
    $('.bodyTypeAct').text(data.map(data => data.bodyType));
    await $.post('/getImg', { img: data.map(data => data.imgOfCar) }, function(responce) {
        $('.img_img_Act').attr('src', "data:image/jpeg/png;base64," + responce)
    })
}

const endrentCarBtnClick = () => {
    $.post('/endCurrentContract', { userID: localStorage.getItem("userID"), active: true }, function(responce) {
        localStorage.removeItem('carID')
        location.reload()
    })
}

$(window).on('load', readyFn)