let dimension = 9;

const getId = (i, j) => {
  return i.toString() + j.toString();
};

let gridEl = [];

let arr = [];
while (arr.length < 81) {
  let randomNumber = Math.round(Math.random() * (81 - 1) + 1);
  if (arr.indexOf(randomNumber) === -1) {
    arr.push(randomNumber);
  }
}

let arrIndex = 0;

let index = [];
for (let row = 0; row < dimension; row++) {
  gridEl[row] = [];
  for (let col = 0; col < dimension; col++) {
    if (arr[arrIndex] <= 10) {
      index.push(`${row}${col}`);
      gridEl[row][col] = new Image();
      gridEl[row][col].src = "bomb.svg";
    } else {
      gridEl[row][col] = arr[arrIndex];
    }
    arrIndex++;
  }
}

let display = document.getElementById("gridContainer");

const getValue = (i, j) => {
  let count = 0;

  if (i === 0 && j === 0) {
    count = isNaN(gridEl[i][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j + 1]) ? count + 1 : count;
    return count;
  }
  if (i === 0 && j === 8) {
    count = isNaN(gridEl[i][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j - 1]) ? count + 1 : count;
    return count;
  }
  if (i === 8 && j === 0) {
    count = isNaN(gridEl[i][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j + 1]) ? count + 1 : count;
    return count;
  }
  if (i === 8 && j === 8) {
    count = isNaN(gridEl[i][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j - 1]) ? count + 1 : count;
    return count;
  }
  if (j === 0 && i >= 1) {
    count = isNaN(gridEl[i - 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i][j + 1]) ? count + 1 : count;
    return count;
  }
  if (j === 8 && i >= 1) {
    count = isNaN(gridEl[i - 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i][j - 1]) ? count + 1 : count;
    return count;
  }
  if (i === 0 && j >= 1) {
    count = isNaN(gridEl[i][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i + 1][j]) ? count + 1 : count;
    return count;
  }
  if (i === 8 && j >= 1) {
    count = isNaN(gridEl[i][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j - 1]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j + 1]) ? count + 1 : count;
    count = isNaN(gridEl[i - 1][j]) ? count + 1 : count;
    return count;
  }
  count = isNaN(gridEl[i][j - 1]) ? count + 1 : count;
  count = isNaN(gridEl[i][j + 1]) ? count + 1 : count;
  count = isNaN(gridEl[i - 1][j]) ? count + 1 : count;
  count = isNaN(gridEl[i + 1][j]) ? count + 1 : count;
  count = isNaN(gridEl[i - 1][j - 1]) ? count + 1 : count;
  count = isNaN(gridEl[i + 1][j + 1]) ? count + 1 : count;
  count = isNaN(gridEl[i + 1][j - 1]) ? count + 1 : count;
  count = isNaN(gridEl[i - 1][j + 1]) ? count + 1 : count;
  return count;
};

function refreshPage() {
  window.location.reload();
}

let restartBtn = document.getElementById("restart");

let modalDisplay = document.getElementById("modalbody");

const gameOver = (image) => {
  restartBtn.addEventListener("click", () => refreshPage());
  // modalDisplay.innerHTML = `<img src =${image}.gif class="image"/>`;
  modalDisplay.className = "center";
  modalDisplay.className = "modalText";
  modalDisplay.innerHTML = image;
  modalObj.style.display = "block";
};

let modalObj = document.getElementById("mymodal");

let score = 0;
const handleClick = (cell, i, j) => {
  if (isNaN(gridEl[i][j])) {
    for (let cellindex = 0; cellindex < index.length; cellindex++) {
      let el = document.getElementById(index[cellindex]);
      el.style.background = "red";
      el.innerHTML = `<img src="bomb.svg" alt="bombImage" class="size" />`;
    }
    gameOver("YOU LOST! TRY AGAIN!!");

    return;
  }

  let count = getValue(i, j);

  cell.innerHTML = count;
  cell.style.background = "green";
  score++;
  if (score === 71) {
    gameOver("YOU WON!!");
    return;
  }

  gridEl[i][j] = -1;
};

const startGame = () => {
  for (let row = 0; row < dimension; row++) {
    let rowEl = document.createElement("div");
    rowEl.className = "row";
    for (let col = 0; col < dimension; col++) {
      let cellEl = document.createElement("div");
      cellEl.setAttribute("id", getId(row, col));
      cellEl.className = "cell";
      cellEl.oncontextmenu = () => {
        cellEl.innerHTML = `<img src ="exclamation.svg" alt="flag" class = "size"/>`;
      };
      cellEl.addEventListener("click", () => {
        if (gridEl[row][col] !== -1) handleClick(cellEl, row, col);
      });

      rowEl.appendChild(cellEl);
    }
    display.appendChild(rowEl);
  }
};

startGame();
