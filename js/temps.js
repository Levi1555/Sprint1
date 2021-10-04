    // const ONE = '1'
    // const TWO = '2'
    // const THREE = '3'
    // const FOUR= '4'
    // const FIVE = '5'
    // const SIX ='6'
    // const SEVEN ='7'
    // const EIGHT = '8'


// function renderBoard() {

// 	var strHTML = '';
// 	for (var i = 0; i < gBoard.length; i++) {
// 		strHTML += '<tr>\n';
// 		for (var j = 0; j < gBoard[0].length; j++) {
// 			var currCell = gBoard[i][j];
// 			var cellClass = getClassName({ i: i, j: j })
// 			cellClass += (currCell.isMine) ? 'mine' : 'empty';
// 			strHTML += '\t<td class="cell ' + cellClass +
// 				'"  onclick="ifPressed" >\n';
// 			if (currCell.isMine) {
// 				strHTML += GAMER_IMG;
// 			} else if (currCell.gameElement === BALL) {
// 				strHTML += BALL_IMG;
// 			}

// 			strHTML += '\t</td>\n';
// 		}
// 		strHTML += '</tr>\n';
// 	}

// 	// console.log('strHTML is:');
// 	// console.log(strHTML);
// 	var elBoard = document.querySelector('.board');
// 	elBoard.innerHTML = strHTML;
// }