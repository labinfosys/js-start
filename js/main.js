var nums = [];

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