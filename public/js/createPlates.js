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