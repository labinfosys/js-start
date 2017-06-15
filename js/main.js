var nums = [];
var currentChipsValue = null;

function getNumber() {
    return Math.round(Math.random() * 36);
}

function getColor(num) {
    var black = [2,4,6,8,10,11,13,15,17,22,24,26,28,29,31,33,35];
    if (num == 0) 
        return '';
    if (black.indexOf(num) >= 0)
        return 'black';
    return 'red';
}

function getName(num) {
    if (num == 0) 
        return 'zero';
    return num + ' ' + getColor(num);
}

function addNumber() {
    var num = getNumber();
    nums.unshift(getName(num));
    if (nums.length > 10) 
        nums.pop();
    console.log(nums);
}

document.addEventListener('DOMContentLoaded', function() {
    var btnStart = document.querySelector('#start');
    var chips = document.querySelectorAll('.chips-list__chips');
    // Очистка активных фишек
    var deactivateChips = function() {
        chips.forEach(function(el) {
            el.classList.remove('chips-list__chips--active');
        });
    };
    // Функция активации 
    var activateChips = function(el) {
        deactivateChips();
        el.classList.add('chips-list__chips--active');
        currentChipsValue = el.getAttribute('data-value');
    };
    btnStart.addEventListener('click', function() {
        deactivateChips();
        addNumber();
    });
    chips.forEach(function(el) {
        el.addEventListener('click', function() {
            activateChips(el);
        });
    });
});