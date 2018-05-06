/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    var num = array.length;

    for (var i = 0; i < num; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArray = [];
    var num = array.length;

    for (var i = 0; i < num; i++) {
        newArray[i] = fn(array[i], i, array);
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var result;
    var num = array.length;

    if (initial == undefined) {
        result = array[0];
        for (var i = 1; i < num; i++) {
            result = fn(result, array[i], i, array);
        }        
    } else {
        result = initial;
        for (var j = 0; j < num; j++) {
            result = fn(result, array[j], j, array);
        }     
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var arr = [];
    
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key.toUpperCase());
        }
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    var arr = [];
    var number = array.length;

    if (from < 0) {
        from = number + from;
        if (from < 0) {
            from = 0;
        }
    }
    if (from == undefined) {
        from = 0;
    } 
    if (to < 0) {
        to = number + to;
    }
    if (to == undefined || to > number) {
        to = number;
    } 
    if (from > number) {
        return arr;
    } 

    for (var i = from; i < to; i++) {
        arr.push(array[i]);
    }

    return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;
            
            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
