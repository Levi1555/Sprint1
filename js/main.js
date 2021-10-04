'use strict';
const FLAG = '7'
const MINE = 'Q'
const Q_MARK = 'X'
const EMPTY = ' '
const BEGINER_MINE_NUM = 2
const MEDIUM_MINE_NUM = 12
const EXPORT_MINE_NUM = 30


var gBoard
var gMinesLocations
var gLevel = [{ size: 4, mines: 2 }, { size: 8, mines: 12 }, { size: 12, mines: 30 }]
var gLives = 3
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }



function init(level) {
    gBoard = buildBoard(level)
    gGame.isOn = true
    console.log(gMinesLocations);
    renderBoard()
}

function buildBoard(level) {
    gBoard = createMat(gLevel[level].size, gLevel[level].size)
    gMinesLocations = minesLocation(level)
    insertMineInBoard()
    setMinesNegsCount(level)
    return gBoard
        //לאפס טיימר
}

//return mines locations
function minesLocation(level) {
    var emptyCells = getCells(gBoard, '')
    var minesLocations = []
    for (var i = 0; i < gLevel[level].mines; i++) {
        var emptyLocation = getRndInteger(0, emptyCells.length - 1)
        minesLocations.push(emptyCells[emptyLocation])
        emptyCells.splice(emptyLocation, 1)
    }
    return minesLocations
}

//enter the mines to the board:
function insertMineInBoard() {
    for (var i = 0; i < gMinesLocations.length; i++) { ///
        var panel = {
            minesAroundCount: 0,
            isShown: true,
            isMine: true,
            isMarked: false
        }
        gBoard[gMinesLocations[i].i][gMinesLocations[i].j] = panel //enter the mines to the gBoard:
    }
}

//update minesAroundCount
function setMinesNegsCount(level) {
    for (var i = 0; i < gLevel[level].size; i++) {
        for (var j = 0; j < gLevel[level].size; j++) {
            if (!gBoard[i][j].isMine) {
                //console.log(i, j);
                var minesCounter = 0
                for (var k = i - 1; k <= i + 1; k++) {
                    for (var l = j - 1; l <= j + 1; l++) {
                        if (i === k && l === j) {
                            minesCounter = minesCounter //check why return not working
                        } else if (k < 0 || l < 0 || k >= gLevel[level].size || l >= gLevel[level].size) { //(!gBoard[k][l]) { -- check why its not working
                            minesCounter = minesCounter //check why return not working
                        } else if (gBoard[k][l].isMine) {
                            minesCounter++
                        }
                    }
                }
                var panel = {
                    minesAroundCount: minesCounter,
                    isShown: true,
                    isMine: false,
                    isMarked: false

                }
                gBoard[i][j] = panel
            }
        }
    }
}

// function ngbrCounter((rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd)) {

// }

function isNgbrMine(mat, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    var sum = 0;
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            var currCell = mat[i][j];
            sum += currCell;
        }
    }
    return sum;
}


function renderBoard() {
    console.log(gBoard);
    var showName = ' '
    var strHTML = '<table>';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            var className = gBoard[i][j].isMine ? 'mine' : 'negs' + gBoard[i][j].minesAroundCount;
            //var ShowName = 
            if (gBoard[i][j].isMine) {
                showName = MINE
            } else if (gBoard[i][j].minesAroundCount > 0) {
                showName = gBoard[i][j].minesAroundCount
            } else {
                showName = ' ' //למה בלי ה"אלס" זה לא עובד למרות שהוגדר כבר למעלה?
            }
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this,${i},${j})" class="cell not-pressed ${className}">${showName}</td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</table>'
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}




// function getClassName(location) {
//     var cellClass = 'cell-' + location.i + '-' + location.j;
//     return cellClass;
// }

function cellClicked(elCell, i, j) {
    startTimer()
}

// cellMarked(elCell){

// }

// checkGameOver() {

// }

// expandShown(board, elCell, i, j) {

// }