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