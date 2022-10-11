const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
    
  }
  // console.log(board);
  
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


function placeInTable(y, x){
  const piece = document.createElement("div");
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
};





function handleClick(event){
  const x = event.target.id;
  const y = findSpotForCol(x);
  if(y === null){
    return;
  }

  board[y][x] = currPlayer;
  placeInTable(y, x);



  
  //switch player
  //my way
  if(currPlayer === 1){
    return currPlayer = 2;
  }else if(currPlayer === 2){
    return currPlayer = 1;
  }

  //// switch players - better way with Conditional (ternary) operator.
  // currPlayer = currPlayer === 1 ? 2 : 1;


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










makeBoard();
makeHtmlBoard();