/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100vh';
homeworkContainer.style.position = 'relative';

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement('div');
    
    newDiv.classList.add('draggable-div');
    
    function randomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const width = randomNumber(1000, 10);
    const height = randomNumber(1000, 10);    
    const xPosition = randomNumber((homeworkContainer.clientWidth - width), 0);
    const yPosition = randomNumber((homeworkContainer.clientHeight - height), 0);
    const colorR = randomNumber(255, 0);
    const colorG = randomNumber(255, 0);
    const colorB = randomNumber(255, 0);

    newDiv.style.width = width + 'px';
    newDiv.style.height = height + 'px';
    newDiv.style.left = xPosition + 'px';
    newDiv.style.top = yPosition + 'px';
    newDiv.style.backgroundColor = '#' + colorR.toString(16) + colorG.toString(16) + colorB.toString(16);
    newDiv.style.position = 'absolute';

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.ondragstart = false;

    target.onmousedown = function() {         
        function moveAt(e) {
            target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
        }
    
        document.onmousemove = function(e) {
            moveAt(e);
        }
    
        target.onmouseup = function() {
            document.onmousemove = null;
            target.onmouseup = null;
        }
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
