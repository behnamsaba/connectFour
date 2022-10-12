const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
    
  }
  // console.log(board);
  
}


///check any avaliablity spot in column -- x 
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  // console.log("not empty")
  alert("No Spot Available");
  return null
}


function placeInTable(y, x){
  const piece = document.createElement("div");
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
};


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}





function handleClick(event){
  //for creating our boarder we need to know X and Y
  const x = event.target.id;
  const y = findSpotForCol(x);
  //if every space was accoupied, findSpotforColr return null for y.
  if(y === null){
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  //////////////////////////////////
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  //switch player
  //my way
  // if(currPlayer === 1){
  //   return currPlayer = 2;
  // }else if(currPlayer === 2){
  //   return currPlayer = 1;
  // }

  // switch players - better way with Conditional (ternary) operator.
  currPlayer = currPlayer === 1 ? 2 : 1;


}

function makeHtmlBoard(){
  const board = document.getElementById("board");
  const top = document.createElement("tr");
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  //add table data into tabale row for top clickable 
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);
  
  //make not clickable part of board (6 row) => should create 6 tabale row in html (tr)
  for(let y = 0 ; y < HEIGHT ; y++){
    const row = document.createElement("tr");

    for(let x = 0 ; x < WIDTH ; x++){
      const cell = document.createElement("td");
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }

}

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //after creating 4 cells in a row, we should check if all pieces belong to same player.
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    ); 


  }

  // TODO: read and understand this code. Add comments to help you.

  //inorder to compare wining condition, we have to build 4 pieces and put in into array with nested loop 
  //it looks like two-dimensional array as a matrix that has rows and columns
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // find winner (only checking each win-possibility as needed) and if one of the condition met it return true to break the loop.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}












makeBoard();
makeHtmlBoard();