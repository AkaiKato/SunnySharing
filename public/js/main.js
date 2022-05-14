const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
});

var myPlacemark

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
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("yaMap", {
            center: [55.7887, 49.1221],
            zoom: 15
        });
        myPlacemark = new ymaps.Placemark([55.7887, 49.1221], null, {
            preset: 'islands#blueDotIcon'
        });
        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events.add('click', function() {
            document.querySelector('.sub-container').classList.toggle('hide')
            document.querySelector('.img_zagl').classList.toggle('hide');
            // console.log(URL.createObjectURL($('img_car').attr('src')))
            // $('#yourDiv').trigger("create");
        })
    }
}

$("#dropList").on('change', function() {
    console.log($("#dropList option:selected").text());
})