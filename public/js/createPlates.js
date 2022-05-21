const createPlateAdmin = (data) => {
    let showadmins = document.querySelector('.showadmins');
    showadmins.innerHTML += '\
    <div class="oneadmin">\
        <div class="leftcolumn">\
            <h3>Фамилия</h3>\
            <p id="surnameAdmin">' + data.surname + '</p>\
            <h3>Имя</h3>\
            <p id="nameAdmin">' + data.name + '</p>\
            <h3>Отчество</h3>\
            <p id="fatherNameAdmin">' + data.fathername + '</p>\
        </div>\
        <div class="rightcolumn">\
            <h3>Логин</h3>\
            <p id="loginAdmin">' + data.login + '</p>\
            <h3>Пароль</h3>\
            <p id="passwordAdmin">' + data.password + '</p>\
        </div>\
        <div class="btnWrapper">\
            <button class="changeAdminbtn" onclick="adminchangeBtnClick(' + "'" + data._id + "'" + ')">Изменить</button>\
            <button class="delAdminbtn" onclick="admindeleteBtnClick(' + "'" + data._id + "'" + ')">Удалить</button>\
        </div>\
    </div>\
    '
}

const admindeleteBtnClick = (data) => {
    var getId = { id: data };
    $.post("/delAdministrator", getId, function(responce) {
        location.reload();
    })
}

const adminchangeBtnClick = (data) => {
    sessionStorage.id = data;
    var adm = { "id": data }
    $.post('/admingetone', adm, function(responce) {
        setDataAdmin(responce);
    })
}

const createPlateTech = (data) => {
    let showtech = document.querySelector('.showtech');
    showtech.innerHTML += '\
    <div class="onetech">\
        <div class="leftcolumn">\
            <h3>Фамилия</h3>\
            <p id="surnameTech">' + data.surname + '</p>\
            <h3>Имя</h3>\
            <p id="nameTech">' + data.name + '</p>\
            <h3>Отчество</h3>\
            <p id="fatherNameTech">' + data.fathername + '</p>\
        </div>\
    <div class="rightcolumn">\
        <h3>Номер телефона</h3>\
        <p id="numberTech">' + data.number + '</p>\
        <h3>Логин</h3>\
        <p id="loginTech">' + data.login + '</p>\
        <h3>Пароль</h3>\
        <p id="passwordTech">' + data.password + '</p>\
        </div>\
        <div class="btnWrapper">\
            <button class="changebtn" onclick="techchangeBtnClick(' + "'" + data._id + "'" + ')">Изменить</button>\
            <button class="delbtn" onclick="techdeleteBtnClick(' + "'" + data._id + "'" + ')">Удалить</button>\
        </div>\
    </div> \
    '
}

const techdeleteBtnClick = (data) => {
    var getId = { id: data };
    $.post("/delTech", getId, function(responce) {
        location.reload();
    })
}

const techchangeBtnClick = (data) => {
    sessionStorage.id = data;
    var tech = { "id": data }
    $.post('/techgetone', tech, function(responce) {
        setDataTech(responce);
    })
}

const createPlateUser = (data) => {
    let showtech = document.querySelector('.main_requests');
    var birthday = data.birthday.split("T").shift();
    var passportDate = data.passportDate.split("T").shift();
    var licenseDate = data.licenseDate.split("T").shift();
    showtech.innerHTML += '\
    <div class="person_specs">\
        <div class="person_block">\
            <div class="leftColumn">\
                <h3>Фамилия</h3>\
                <p>' + data.surname + '</p>\
                <h3>Имя</h3>\
                <p>' + data.name + '</p>\
                <h3>Отчество</h3>\
                <p>' + data.fathername + '</p>\
                <h3>Номер Телефона</h3>\
                <p>' + data.number + '</p>\
                <h3>Дата рождения</h3>\
                <p>' + birthday + '</p>\
                <h3>Номер паспорта</h3>\
                <p>' + data.passportNumber + '</p>\
            </div>\
            <div class="rightColumn">\
                <h3>Серия</h3>\
                <p>' + data.passportSeries + '</p>\
                <h3>Кем Выдан</h3>\
                <p>' + data.passportIsued + '</p>\
                <h3>Дата выдачи</h3>\
                <p>' + passportDate + '</p>\
                <h3>Номер удостоверения</h3>\
                <p>' + data.licenseNumber + '</p>\
                <h3>Дата окончания срока действия прав</h3>\
                <p>' + licenseDate + '</p>\
            </div>\
        </div>\
        <div class="block_btn">\
            <button class="accept_btn" onclick="confirmBtnClick(' + "'" + data._id + "'" + ')">Принять</button>\
            <button class="decline_btn" onclick="declineBtnClick(' + "'" + data._id + "'" + ')">Отклонить</button>\
        </div>\
    </div> \
    '
}

const confirmBtnClick = (data) => {
    var getId = { id: data };
    $.post("/acceptUser", getId, function(responce) {
        location.reload();
    })
}

const declineBtnClick = (data) => {
    var getId = { id: data };
    $.post("/declineUser", getId, function(responce) {
        location.reload();
    })
}

const getImg = (data) => {
    $.post('/getImg', data, function(responce) {
        imgSrc = responce
    })
}

async function createPlateCar(data) {
    let carShow = document.querySelector('.main_show');
    var imgSrc
    await $.post('/getImg', { img: data.imgOfCar }, function(responce) {
        imgSrc = "data:image/jpeg/png;base64," + responce
    })
    carShow.innerHTML += '\
    <div class="car_specs">\
        <div class="car_block">\
            <div class="img_block">\
                <img class="img_img" src="' + imgSrc + '" alt="zagl">\
            </div>\
            <div class="firstcol">\
                <h3>Марка</h3>\
                <p id="#brandC">' + data.brand + '</p>\
                <h3>Модель</h3>\
                <p id="#modelC">' + data.model + '</p>\
            </div>\
            <div class="secondcol">\
                <h3>Регистрационный знак</h3>\
                <p id="#registMarkC">' + data.registMark + '</p>\
                <h3>Цвет</h3>\
                <p id="#colorC">' + data.color + '</p>\
            </div>\
                <div class="thirdcol">\
                <h3>Пробег</h3>\
                <p id="#mileageC">' + data.mileage + 'KM</p>\
                <h3>Коробка передач</h3>\
                <p id="#transmissionC">' + data.transmission + '</p>\
            </div>\
            <div class="fourthcol">\
                <h3>Тип двигателя</h3>\
                <p id="#engineTypeC">' + data.engineType + '</p>\
                <h3>Тип кузова</h3>\
                <p id="#bodyTypeC">' + data.bodyType + '</p>\
                </div>\
            <div class="fifthcol">\
                <h3>ПТС</h3>\
                <p id="#PTSC">' + data.PTS + '</p>\
                <h3>Номер стоянки</h3>\
                <p id="#parkingNumberC">' + data.parkingNumber + '</p>\
            </div>\
        </div>\
        <div class="block_btn">\
            <button class="change_btn" onclick="changeCarBtnClick(' + "'" + data._id + "'" + ')">Изменить</button>\
            <button class="delete_btn" onclick="deleteCarBtnClick(' + "'" + data._id + "'" + ')">Удалить</button>\
        </div>\
    </div> \
    '

}

const changeCarBtnClick = (data) => {
    sessionStorage.id = (data)
    $.post("/getoneCar", { id: data }, function(responce) {
        setDataCar(responce)
    })
}

const deleteCarBtnClick = (data) => {
    $.post("/deleteCar", { id: data }, function(responce) {
        location.reload();
    })
}

async function createPlateReq(data) {
    let reqShow = document.querySelector('.main-container');
    if (data.carID != '') {
        var carInfo;
        await $.post("/getoneCar", { id: data.carID }, function(responce) {
            carInfo = responce;
        })
        reqShow.innerHTML += '\
            <div class="wrapper_main_content">\
                <div class="request_block">\
                    <div class="text_request">\
                        <textarea disabled>' + data.messageIn + '</textarea>\
                    </div>\
                    <div class="answ_request">\
                        <textarea id="' + data._id + '"></textarea>\
                    </div>\
                    <div class="buttons">\
                        <button class="btn_car" onclick="showCarTheTechRequest(' + "'" + data._id + "'" + ')">Посмотреть машину</button>\
                        <button class="btn_end" onclick="answerTheTechRequest(' + "'" + data._id + "'" + ')">Ответить на заявку</button>\
                    </div>\
                </div>\
                <div class="car_specs " id="' + data._id + '">\
                    <div class="car_block">\
                        <div class="leftColumn">\
                            <h3>Марка</h3>\
                            <p>' + carInfo.map(thing => thing.brand) + '</p>\
                            <h3>Модель</h3>\
                            <p>' + carInfo.map(thing => thing.model) + '</p>\
                            <h3>Регистрационный знак</h3>\
                            <p>' + carInfo.map(thing => thing.registMark) + '</p>\
                            <h3>Цвет</h3>\
                            <p>' + carInfo.map(thing => thing.color) + '</p>\
                        </div>\
                        <div class="rightColumn">\
                            <h3>Пробег</h3>\
                            <p>' + carInfo.map(thing => thing.mileage) + 'КМ</p>\
                            <h3>Коробка передач</h3>\
                            <p>' + carInfo.map(thing => thing.transmission) + '</p>\
                            <h3>Тип двигателя</h3>\
                            <p>' + carInfo.map(thing => thing.engineType) + '</p>\
                            <h3>Тип кузова</h3>\
                            <p>' + carInfo.map(thing => thing.bodyType) + '</p>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        '
    } else {
        reqShow.innerHTML += '\
            <div class="wrapper_main_content">\
                <div class="request_block">\
                        <div class="text_request">\
                            <textarea disabled>' + data.messageIn + '</textarea>\
                        </div>\
                        <div class="answ_request">\
                            <textarea id="' + data._id + '"></textarea>\
                        </div>\
                        <div class="buttons">\
                            <button class="btn_end" onclick="answerTheTechRequest(' + "'" + data._id + "'" + ')">Ответить на заявку</button>\
                        </div>\
                </div>\
            </div>\
        '
    }
}

const showCarTheTechRequest = (data) => {
    $('#' + data).toggle();
}

const answerTheTechRequest = (data) => {
    answ_request(data)
}

async function createParkings() {
    let parkings = document.querySelector('.sub-container');
    for (var i = 1; i <= 5; i++) {
        var adress
        await $.post('/getOnePark', { parkingNumber: i }, function(responce) {
            adress = responce.parkingStreet + " " + responce.parkingBuilding
        })
        parkings.innerHTML += '\
            <div class="content_container" id="' + i.toString() + '">\
                <div class="parkingAdress">\
                    <h3>Парковка по адресу: ' + adress + '</h3>\
                </div>\
                <select class="droplist" id="dropList' + i.toString() + '">\
                        <option value="" disabled selected>Выберите машину</option>\
                </select>\
                <img class="img_noCars" id="img' + i.toString() + '" src="../img/noCars.png">\
                <div id="block' + i.toString() + '">\
                    \
                </div>\
            </div>\
        '
    }
}

async function createParkingCar(data) {
    await $.post('/checkcarContract', { carID: data._id }, function(responce) {
        if (responce.False) {
            secondStep(data)
        }
    })
}

async function secondStep(data) {
    var imgSrc;
    $('#dropList' + data.parkingNumber).append($('<option>', {
        value: data._id,
        text: data.model + " " + data.brand
    }));

    await $.post('/getImg', { img: data.imgOfCar }, function(responce) {
        imgSrc = "data:image/jpeg/png;base64," + responce
    })
    await $('#block' + data.parkingNumber).append('\
    <div class="car_specs" id="' + data._id + '">\
        <img class="img_car" src="' + imgSrc + '" alt="zagl">\
        <div class="car">\
            <div class="leftColumn">\
                <h3>Марка</h3>\
                <p>' + data.brand + '</p>\
                <h3>Модель</h3>\
                <p>' + data.model + '</p>\
                <h3>Регистрационный знак</h3>\
                <p>' + data.registMark + '</p>\
                <h3>Цвет</h3>\
                <p>' + data.color + '</p>\
            </div>\
            <div class="rightColumn">\
                <h3>Пробег</h3>\
                <p>' + data.mileage + 'КМ</p>\
                <h3>Коробка передач</h3>\
                <p>' + data.transmission + '</p>\
                <h3>Тип двигателя</h3>\
                <p>' + data.engineType + '</p>\
                <h3>Тип кузова</h3>\
                <p>' + data.bodyType + '</p>\
            </div>\
        </div>\
        <div class="btn-rent-form">\
            <button class="btn_rent" onclick="rentCarBtnClick(' + "'" + data._id + "'" + ')">Арендовать</button>\
        </div>\
    </div>\
    ')
}

const rentCarBtnClick = (data) => {
    $.post('/checkAccept', { id: localStorage.getItem('userID') }, function(response) {
        if (response.True) {
            if (localStorage.getItem('carID') == null) {
                localStorage.setItem('carID', data);
                location.href = '/fee';
            } else {
                showAlert("У вас уже есть арендованая машина!")
            }
        } else {
            showAlert("У вас не подтвержденный аккаунт, ждите подтверждения")
        }
    })

}

const showAlert = (msg) => {
    $(".alert-msg").text(msg);
    $(".alert-box").addClass("show");
    setTimeout(() => {
        $(".alert-box").removeClass("show");
    }, 3000)
}

async function createHistoryCar(data) {
    var carData, imgSrc;
    var dateBeg = new Date(data.dateOfBegin)
    var dateEnd = new Date(data.dateOfEnd)
    var options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
    };

    await $.post('/getoneCar', { id: data.carID }, function(responce) {
        console.log(responce)
        carData = responce
    })
    await $.post('/getImg', { img: carData.map(data => data.imgOfCar) }, function(responce) {
        imgSrc = "data:image/jpeg/png;base64," + responce
    })
    await $('.wrapper_main_content').append('\
    <div class="history_block">\
        <div class="img_block">\
            <img class="img_img" src="' + imgSrc + '" alt="zagl">\
        </div>\
        <div class="car_block">\
            <div class="leftColumn">\
                <h3>Марка</h3>\
                <p class="brand">' + carData.map(data => data.brand) + '</p>\
                <h3>Модель</h3>\
                <p class="model">' + carData.map(data => data.model) + '</p>\
                <h3>Регистрационный знак</h3>\
                <p class="registMark">' + carData.map(data => data.registMark) + '</p>\
                <h3>Цвет</h3>\
                <p class="color">' + carData.map(data => data.color) + '</p>\
                <h3>Дата начала аренды</h3>\
                <p class="dateBegin">' + dateBeg.toLocaleString("ru", options) + '</p>\
            </div>\
            <div class="rightColumn">\
                <h3>Пробег</h3>\
                <p class="mileage">' + carData.map(data => data.mileage) + 'КМ</p>\
                <h3>Коробка передач</h3>\
                <p class="transmission">' + carData.map(data => data.transmission) + '</p>\
                <h3>Тип двигателя</h3>\
                <p class="engineType">' + carData.map(data => data.engineType) + '</p>\
                <h3>Тип кузова</h3>\
                <p class="bodyType">' + carData.map(data => data.bodyType) + '</p>\
                <h3>Дата конца аренды</h3>\
                <p class="dateEnd">' + dateEnd.toLocaleString("ru", options) + '</p>\
            </div>\
        </div>\
    </div>\
    ')
}