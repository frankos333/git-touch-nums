'use script'
var gNums = [];
const LEVELS = { easy: 16, medium: 25, hard: 36 }
var prevCell = 0;
var timer = 0;
var timervar = null;
var counter = 0;


function init(level) {
    clearInterval(timervar);
    timervar=null;
    timer = 0;
    prevCell = 0;
    counter = 0
    createBoard(LEVELS[level]);
}

function createBoard(size) {
    gNums = []
    var numberOrder = [];
    for (let i = 0; i < size; i++) {
        numberOrder.push(i + 1);
    }
    for (var i = 0; i < size; i++) {
        var randomIndex = Math.floor(Math.random() * numberOrder.length);
        gNums.push(numberOrder[randomIndex]);
        numberOrder.splice(randomIndex, 1);
    }

    renderBoard(gNums)
}
function renderBoard(nums) {
    var strHTML = '';
    var length = Math.sqrt(gNums.length)
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < length; j++) {
            var cell = nums[length * i + j]
            strHTML += `<td onclick="cellClicked(this)" >
            ${cell}</td>`
        }

        strHTML += '</tr>'
    }
    var elTbody = document.querySelector('.board');
    elTbody.innerHTML = strHTML;
}
function cellClicked(elCell) {
    var num = parseInt(elCell.innerText)
    var className = 'clicked'
    if (num === prevCell + 1) {
        if (!timervar) {
            timervar = setInterval(function () {
                timer++;
                document.querySelector('.timer').innerText = `Time:${reFactorTime(timer)}`;
            }, 10)
        }
        if (num === gNums.length) {

            clearInterval(timervar)
            prevCell = 0;
            timer = 0;
            timervar = null;
        }

        prevCell++;
        elCell.classList.add(className)
        console.log('enter following number')
    }
    else {
        console.log('wrong number')
    }
}
//This function reformat time
function reFactorTime(num) {
    var minutes = Math.floor(num / 100 / 60);
    var seconds = Math.floor((num - (minutes * 100 * 60)) / 100);
    var miliseconds = num % 100

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if (miliseconds < 10) { miliseconds = "0" + miliseconds }
    return minutes + ':' + seconds + ':' + miliseconds
}


