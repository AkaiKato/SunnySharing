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
        $('.main_add').removeClass('hide')
        let user = localStorage.getItem("userLogin")
        $('.account-info').text('Вы вошли как, ' + user);
    } else {
        location.replace("/")
        return
    }

    await createParkings()

    await $.post('/getAllCars', {}, function(responce) {
        console.log(responce)
        responce.forEach(car => createParkingCar(car))
    })

    for (var i = 1; i <= 5; i++) {
        $('#block' + i.toString()).hide()
    }
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("yaMap", {
            center: [55.7887, 49.1221],
            zoom: 15
        });

        var firstParking = new ymaps.Placemark([55.789330, 49.104051], null, {
            preset: 'islands#blueDotIcon'
        });
        var secondParking = new ymaps.Placemark([55.790514, 49.126815], null, {
            preset: 'islands#blueDotIcon'
        });
        var thirdParking = new ymaps.Placemark([55.785367, 49.123033], null, {
            preset: 'islands#blueDotIcon'
        });
        var fourthParking = new ymaps.Placemark([55.789082, 49.136103], null, {
            preset: 'islands#blueDotIcon'
        });
        var fifthParking = new ymaps.Placemark([55.775256, 49.136022], null, {
            preset: 'islands#blueDotIcon'
        });

        myMap.geoObjects.add(firstParking);
        myMap.geoObjects.add(secondParking);
        myMap.geoObjects.add(thirdParking);
        myMap.geoObjects.add(fourthParking);
        myMap.geoObjects.add(fifthParking);

        firstParking.events.add('click', function() {
            $('.sub-container').removeClass('hide')
            $('.img_zagl').addClass('hide');
            $('#1').show().siblings().hide()
            if ($('#dropList1 option').length != 1) {
                $('#img1').hide()
            }
        })

        secondParking.events.add('click', function() {
            $('.sub-container').removeClass('hide')
            $('.img_zagl').addClass('hide');
            $('#2').show().siblings().hide()
            if ($('#dropList1 option').length != 1) {
                $('#img1').hide()
            }
        })

        thirdParking.events.add('click', function() {
            $('.sub-container').removeClass('hide')
            $('.img_zagl').addClass('hide');
            $('#3').show().siblings().hide()
            if ($('#dropList1 option').length != 1) {
                $('#img1').hide()
            }
        })

        fourthParking.events.add('click', function() {
            $('.sub-container').removeClass('hide')
            $('.img_zagl').addClass('hide');
            $('#4').show().siblings().hide()
            if ($('#dropList1 option').length != 1) {
                $('#img1').hide()
            }
        })

        fifthParking.events.add('click', function() {
            $('.sub-container').removeClass('hide')
            $('.img_zagl').addClass('hide');
            $('#5').show().siblings().hide()
            if ($('#dropList1 option').length != 1) {
                $('#img1').hide()
            }
        })
    }

    $("#dropList1").on('change', function() {
        $('#block1').show()
        $('#' + $("#dropList1 option:selected").val()).show().siblings().hide();
    })
    $("#dropList2").on('change', function() {
        $('#block2').show()
        $('#' + $("#dropList1 option:selected").val()).show().siblings().hide();
    })
    $("#dropList3").on('change', function() {
        $('#block3').show()
        $('#' + $("#dropList1 option:selected").val()).show().siblings().hide();
    })
    $("#dropList4").on('change', function() {
        $('#block4').show()
        $('#' + $("#dropList1 option:selected").val()).show().siblings().hide();
    })
    $("#dropList5").on('change', function() {
        $('#block5').show()
        $('#' + $("#dropList1 option:selected").val()).show().siblings().hide();
    })
}

$(window).on("load", readyFn);