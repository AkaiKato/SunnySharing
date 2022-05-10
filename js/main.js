$(".check").on("click", function() {
    $(".sub-container").removeClass("hide")
})

$(".check1").on("click", function() {
    $(".sub-container").addClass("hide")
})


var myPlacemark

window.onload = () => {
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
            $(".sub-container").removeClass("hide");
            $(".img_zagl").addClass("hide")
                // $('#yourDiv').trigger("create");
        })
    }

}