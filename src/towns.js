/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

import { loadAndSortTowns as loadTowns } from './index';

function loadData() {
    loadTowns()
        .then(
            () => {
                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';    
            },
            (error) => {
                newBtn.style.display = 'block';
                loadingBlock.innerText = error;
            })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0) {
        return true;
    }
    
    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

const newBtn = document.createElement('button');

newBtn.innerText = 'Повторить';
newBtn.style.display = 'none';
newBtn.addEventListener('click', () => {
    newBtn.style.display = 'none';
    loadData();
});
homeworkContainer.appendChild(newBtn);

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    for (var i = 0; i < filterResult.children.length; i++) {
        filterResult.removeChild(filterResult.children[i]);
        i--;
    }
    var str = filterInput.value;

    if (str != '') {
        loadTowns().then(towns => {
            for (const elem in towns) {
                if (isMatching(towns[elem].name, str)) {
                    var newDiv = document.createElement('div');

                    newDiv.innerHTML = towns[elem].name;
                    filterResult.appendChild(newDiv);
                } 
            }
        })
    }    
});

loadData();

export {
    loadTowns,
    isMatching
};
