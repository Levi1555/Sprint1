'use strict';

//1
function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

//2
function getCells(board) {
    var findsCells = []
    for (var i = 0; i < board.length; i++)
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isShown === false) {
                findsCells.push({ i: i, j: j })
            }
        }
    return findsCells
}

//3
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function shuffle(array) {
    var randIdx, keep, i;
    for (i = array.length - 1; i > 0; i--) {
        randIdx = getRandomIntInc(0, array.length - 1);

        keep = array[i];
        array[i] = array[randIdx];
        array[randIdx] = keep;
    }
    return array;
}
//4
// function startTimer() {
//     var elTimer = document.querySelector('.timer');
//     var timestamp = Date.now();
//     gInterval = setInterval(() => {
//         var time = `${((Date.now() - timestamp) / 1000).toFixed(2)}`;
//         elTimer.innerText = '  timer: ' + time + '  ';
//     }, 10);
// }

function startTimer(holdTime, isPause) {
    if (!isPause) {
        var elTimer = document.querySelector('.timer');
        var timestamp = Date.now();
        gInterval = setInterval(() => {
            var time = `${(holdTime+((Date.now() - timestamp) / 1000)).toFixed(2)}`;
            gGame.secsPassed = (holdTime + ((Date.now() - timestamp) / 1000))
            elTimer.innerText = '  timer: ' + time + '  ';
        }, 10);
    }
}


function renderNums() {
    var nums = shuffle(gNums.slice());
    var rowLength = Math.sqrt(gNums.length);
    var strHTML = '';
    for (var i = 0; i < rowLength; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < rowLength; j++) {
            var num = nums.pop();
            strHTML += `<td class="cell" onclick="cellClicked(${num},this)">${num}</td>`;
        }
        strHTML += '</tr>';
    }

    var elTbody = document.querySelector('.board');
    elTbody.innerHTML = strHTML;
}

function getCellsOriginal(board, findCell) {
    var findsCells = []
    for (var i = 0; i < board.length; i++)
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === findCell) {
                findsCells.push({ i: i, j: j })
            }
        }
    return findsCells
}