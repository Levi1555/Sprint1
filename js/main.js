'use strict';

const FLAG = '🚩'
const MINE = '💣'
const Q_MARK = '❓'
const EMPTY = ' '
const HEART = '♥'
const REG_SMILE = '😎'
const HAPPY_SMILE = '🥳'
const SAD_SMILE = '💩'
const MINE_SMILE = '👎'


var gBoard
var gMinesLocations
var gLevel = [{ size: 4, mines: 2 }, { size: 8, mines: 12 }, { size: 12, mines: 30 }]
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, lives: 3 }
var gInterval
var gIsPause = false




function init(level) {
    gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, lives: 3, isPause: false }
    var gIsPause = false
    var pauseEv = document.querySelector('.pause')
    pauseEv.innerText = 'Pause'
    clearInterval(gInterval)
    gBoard = buildBoard(level)
    renderBoard(level)
    renderSmile(REG_SMILE)
}

function buildBoard(level) {
    gBoard = createMat(gLevel[level].size, gLevel[level].size)
    insertBlanksInBoard(level)
        //gMinesLocations = minesLocation(level)
        //insertMineInBoard()
    return gBoard
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
            isShown: false,
            isMine: true,
            isMarked: false,
            isRightClick: false
        }
        gBoard[gMinesLocations[i].i][gMinesLocations[i].j] = panel //enter the mines to the gBoard:
    }
}

//update minesAroundCount
function insertBlanksInBoard(level) {
    for (var i = 0; i < gLevel[level].size; i++) {
        for (var j = 0; j < gLevel[level].size; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                var panel = {
                    minesAroundCount: setMinesNegsCount(i, j, level),
                    isShown: false,
                    isMine: false,
                    isMarked: false,
                    isRightClick: false
                }
                gBoard[i][j] = panel
            }
        }
    }
}

function setMinesNegsCount(rowId, colId, level) {
    var minesCounter = 0
    for (var i = rowId - 1; i <= rowId + 1; i++) {
        for (var j = colId - 1; j <= colId + 1; j++) {
            if (i === rowId && j === colId) continue
            else if (i < 0 || j < 0 || i >= gLevel[level].size || j >= gLevel[level].size) continue
            else if (gBoard[i][j].isMine) minesCounter++
        }
    }
    return minesCounter
}

function blankNegs(elCell, rowId, colId, level) {
    for (var i = rowId - 1; i <= rowId + 1; i++) {
        for (var j = colId - 1; j <= colId + 1; j++) {
            if (i === rowId && j === colId) continue
            else if (i < 0 || j < 0 || i >= gLevel[level].size || j >= gLevel[level].size) continue
            else if (gBoard[i][j].isShown) continue
            else if (!gBoard[i][j].isMine) {
                if (gBoard[i][j].minesAroundCount === 0) {
                    gBoard[i][j].isShown = true
                    blankNegs(elCell, i, j, level)
                } else {
                    gBoard[i][j].isShown = true
                }
            }

        }
    }
    renderBoard(level)
}


function renderBoard(level) {
    var strHTML = '<table>';
    gGame.shownCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown) gGame.shownCount++
                strHTML += renderCell('', i, j, level)
        }
        strHTML += '</tr>';
    }
    strHTML += '</table>'
    var elTable = document.querySelector('.board');
    document.addEventListener('contextmenu', elTable => elTable.preventDefault());
    //elTable.preventDefault()
    elTable.innerHTML = strHTML;
    renderLives()

}

function renderLives() {
    var elLives = document.querySelector('.heart');
    var strHTML = '';
    var livesString = ''
    if (i < gGame.lives === 0) livesString = ''
    for (var i = 0; i < gGame.lives; i++) {
        livesString += HEART + ' '
    }
    strHTML = `${ livesString }`
    elLives.innerText = strHTML;
}

function renderSmile(smile) {
    var elSmile = document.querySelector('.smile');
    elSmile.innerText = smile;
}

function renderCell(elCell, i, j, level) {
    var strHTML = ''
    var showName = ''
    var className = gBoard[i][j].isMine ? 'mine' : 'negs' + gBoard[i][j].minesAroundCount;
    var clasStart = (gBoard[i][j].isShown) ? 'cell pressed ' : 'cell not-pressed ';
    className = clasStart + className
    if (gBoard[i][j].isRightClick) {
        if (gBoard[i][j].isMarked) {
            showName = ' '
            gBoard[i][j].isMarked = false
            gGame.markedCount--
        } else {
            showName = FLAG
            gBoard[i][j].isMarked = true
            gGame.markedCount++
        }
        gBoard[i][j].isRightClick = false
    } else {
        if (gBoard[i][j].isMarked) {
            showName = FLAG
        } else if (!gBoard[i][j].isShown) {
            showName = ' '
        } else {
            if (gBoard[i][j].isMine) showName = MINE
            else
            if (gBoard[i][j].minesAroundCount > 0) showName = gBoard[i][j].minesAroundCount
            else showName = ' ' //למה בלי ה"אלס" זה לא עובד למרות שהוגדר כבר למעלה?
        }
    }
    strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this,${i},${j},${level})"  onmousedown="celldown(this,${i},${j})" onmouseenter="cellEnter(this,${i},${j},${level})" onmouseleave="cellLeave(this,${i},${j})" oncontextmenu="rightClick(this,${i},${j},${level})" class="${className}">${showName}</td>`;
    checkGameOver(level)
    return strHTML
}

function cellClicked(elCell, i, j, level) {
    if (gGame.lives === 0) return
    if (gGame.isPause) return
    if (gBoard[i][j].isShown) return
    renderSmile(REG_SMILE)
    gBoard[i][j].isShown = true
    if (gGame.secsPassed === 0.00) {
        gMinesLocations = minesLocation(level)
        insertMineInBoard()
        insertBlanksInBoard(level)
    }
    if (!gGame.isOn) startTimer(0.00, false, 0.00)
    gGame.isOn = true
    if (gBoard[i][j].isMine) {
        gGame.lives--;
        renderSmile(MINE_SMILE)
    }

    renderBoard(level)
    renderCell(elCell, i, j, level)

    if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isMine) blankNegs(elCell, i, j, level)

    checkGameOver(level)
}


function checkGameOver(level) {
    if (gGame.lives === 0) {
        console.log('game Over - you lost')
        clearInterval(gInterval)
        renderSmile(SAD_SMILE)
        gGame.isOn = false
            //  return true
    } else if (Math.pow(gLevel[level].size, 2) === gGame.shownCount + gGame.markedCount) {
        console.log('game Over - you won')
        clearInterval(gInterval)
        renderSmile(HAPPY_SMILE)
        gGame.isOn = false
    }
}


function rightClick(elm, i, j, level) {
    if (gBoard[i][j].isShown || !gGame.isOn) return
    else {
        gBoard[i][j].isRightClick = true
        renderBoard(level)
    }
}

function gamePaused(isNotPause, ev, pauseTime) {
    if (gGame.isOn) {
        gGame.isPause = (isNotPause) ? false : true
        ev.innerText = (isNotPause) ? 'Pause' : 'Unpause'
        if (isNotPause) startTimer(pauseTime, !isNotPause)
        else clearInterval(gInterval)
    } else {

    }
}

function cellEnter(elCell, i, j) {

}

function cellLeave(elCell, i, j) {

}

function cellMarked(elCell) {

}

function celldown(elCell, i, j) {

}