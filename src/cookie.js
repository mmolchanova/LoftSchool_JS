/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    var filterStr = filterNameInput.value;

    for (var k = 0; k < listTable.childNodes.length; k++) {
        listTable.removeChild(listTable.childNodes[k]);
        k--;
    }  

    if (filterStr) {
        var obj;

        obj = document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');

            prev[name] = value;

            return prev;
        }, {});
       
        for (const name in obj) {
            if ((name.indexOf(filterStr) >= 0) || (String(obj[name]).indexOf(filterStr) >= 0)) {
                addTr(name, obj[name]);
            }           
        }        
    } else {
        getTable();
    }
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    var filterStr = filterNameInput.value;
    var str = addNameInput.value+'='+addValueInput.value;    
       
    if (getCookie(addNameInput.value)) {
        var arrTr = listTable.querySelectorAll('tr');
        var jLength = arrTr.length;

        for (var j = 0; j < jLength; j++) {
            if (arrTr[j].firstChild.innerHTML == addNameInput.value) {
                if (filterStr) {
                    if ((addNameInput.value.indexOf(filterStr) >= 0) || (addValueInput.value.indexOf(filterStr) >= 0)) {
                        arrTr[j].firstChild.nextElementSibling.innerHTML = addValueInput.value;
                    } else {
                        listTable.removeChild(arrTr[j]);
                    }
                } else {
                    arrTr[j].firstChild.nextElementSibling.innerHTML = addValueInput.value;
                }             
            }
            deleteCookie(addNameInput.value);
        }      
    } else {
        if (filterStr) {
            if ((addNameInput.value.indexOf(filterStr) >= 0) || (addValueInput.value.indexOf(filterStr) >= 0)) {
                addTr(addNameInput.value, addValueInput.value);
            }
        } else {
            addTr(addNameInput.value, addValueInput.value);
        }
    }
    document.cookie = str;
});

function addTr(newName, newValue) {
    const newTr = document.createElement('tr');
    const newTh1 = document.createElement('th');
    const newTh2 = document.createElement('th');
    const newTh3 = document.createElement('th');
    const delBtn = document.createElement('button');

    listTable.appendChild(newTr);
    newTr.appendChild(newTh1);
    newTr.appendChild(newTh2);
    newTr.appendChild(newTh3);
    newTh3.appendChild(delBtn);

    newTh1.innerHTML = newName;
    newTh2.innerHTML = newValue;
    delBtn.innerHTML = ' X ';

    delBtn.addEventListener('click', (e) => {
        var targetTh = e.target.parentNode;
        var targetTr = targetTh.parentNode;
        var firstTh = targetTr.firstChild;
        var nameCookie = firstTh.innerHTML;
        
        deleteCookie(nameCookie);
        listTable.removeChild(targetTr);  
    });    
}

function getTable() {
    var obj;

    obj = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    for (const name in obj) {
        if (name) {
            addTr(name, obj[name]);
        }
    }
}

function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    })
}    

function setCookie(name, value, options) {
    options = options || {};
    
    var expires = options.expires;
    
    if (typeof expires == 'number' && expires) {
        var d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    
    value = encodeURIComponent(value);
    
    var updatedCookie = name + '=' + value;
    
    for (var propName in options) {
        if (propName) { 
            updatedCookie += '; ' + propName;
            var propValue = options[propName];

            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }
    }
    
    document.cookie = updatedCookie;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (document.cookie) {
    getTable();
}
