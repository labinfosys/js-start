var nums = [];
var currentChipsValue = null;
var accountVal = 500;
var rateVal = 0;


var numberList = (function() {
    var list;
    var numbers = [];
    var getNumber = function() {
        return Math.round(Math.random() * 36);
    };
    var getColor = function(num) {
        var black = [2,4,6,8,10,11,13,15,17,22,24,26,28,29,31,33,35];
        if (num == 0) 
            return 'green';
        if (black.indexOf(num) >= 0)
            return 'black';
        return 'red';
    };
    var draw = function() {
        list.forEach(function(el, i) {
            if (numbers[i] !== undefined) {
                el.className = 'number number--' + getColor(numbers[i]);
                el.innerHTML = numbers[i];
            }
        });
    };
    return {
        init: function() {
            list  = document.querySelectorAll('.number-list > .number');
        },
        roll: function() {
            var num = getNumber();
            numbers.unshift(num);
            if (numbers.length > 10) numbers.pop();
            draw();
        }
    }
})();

numberList.init();

function getChildByClassName(el, className) {
    var children = [];
    var result = null;
    el.childNodes.forEach(function(child) {
        if (child.classList !== undefined && child.classList.contains(className) > 0) {
            children.push(child);
        }
    });
    if (children.length > 0)
        result = children.shift();
    return result;
}

function clearRates() {
    var cells = document.querySelectorAll('.cell > ul');
    cells.forEach(function(el) {
        el.remove();
    });
}

function updateInfo() {
    var account = document.querySelector('.control-panel__account');
    var rate = document.querySelector('.control-panel__rate');
    account.innerHTML = accountVal;
    rate.innerHTML = rateVal;
}

document.addEventListener('DOMContentLoaded', function() {
    var btnStart = document.querySelector('#start');
    var chips = document.querySelectorAll('.chips-list__chips');
    var cells = document.querySelectorAll('.cell');
    // Очистка активных фишек
    var deactivateChips = function() {
        chips.forEach(function(el) {
            el.classList.remove('chips-list__chips--active');
        });
        currentChipsValue = null;
    };
    // Функция активации фишки
    var activateChips = function(el) {
        var chipsValue = parseInt(el.getAttribute('data-value'));
        deactivateChips();
        if (accountVal - chipsValue >= 0) {
            el.classList.add('chips-list__chips--active');
            currentChipsValue = chipsValue;
        }
    };
    // Установка активной фишки в ячейку
    var addChips = function(cell) {
        if (currentChipsValue === null) return;
        var list = getChildByClassName(cell, 'chips-list');
        var chips = document.createElement('li');
        chips.className = 'chips chips--' + currentChipsValue;
        if (list === null) {
            list = document.createElement('ul');
            list.classList.add('chips-list');
        }
        list.appendChild(chips);
        cell.appendChild(list);
    };
    clearRates();
    updateInfo();
    btnStart.addEventListener('click', function() {
        clearRates();
        deactivateChips();
        numberList.roll();
        rateVal = 0;
        updateInfo();
    });
    chips.forEach(function(el) {
        el.addEventListener('click', function() {
            activateChips(el);
        });
    });
    cells.forEach(function(el) {
        el.addEventListener('click', function() {
            var balance = accountVal - currentChipsValue;
            if (balance >= 0) {
                addChips(el);
                accountVal = balance;
                rateVal = rateVal + currentChipsValue;
                updateInfo();
            } else {
                deactivateChips();
            }
        });
    });
});