let gameContainer = document.getElementById("game-container");
let gameOver = false;
let score = 0;
document.getElementById("score-card").innerHTML = "Score: " + score;

let arr = [];
let index = 0;
while (arr.length !== 81) {
  let temp = Math.floor(Math.random() * 100);
  if (arr.indexOf(temp) === -1 && temp >= 1 && temp <= 81) {
    arr.push(temp);
  }
}
let boxValues = [];
for(let i = 0; i < 9; i++) {
  let rowArray = [];
  for(let j = 0; j < 9; j++) {
    rowArray.push(arr[index]);
    index++;
  }
  boxValues.unshift(rowArray);
}

let bombLocation = [];
while (bombLocation.length !== 10) {
  let temp = Math.floor(Math.random() * 100);
  if (bombLocation.indexOf(temp) === -1 && temp >= 1 && temp <= 81) {
    bombLocation.push(temp);
  }
}

const getId = (i, j) => {
  return i.toString() + j.toString();
};
let grid = document.createElement("div");

for (let i = 0; i < 9; i++) {
  let rowEle = document.createElement("div");
  rowEle.className = "row";

  for (let j = 0; j < 9; j++) {
    let cellEle = document.createElement("div");
    cellEle.className = "cell center";
    cellEle.setAttribute("id", getId(i, j));
    cellEle.addEventListener("mousedown", () => handleClick(cellEle));
    rowEle.appendChild(cellEle);
  }
  grid.appendChild(rowEle);
}

gameContainer.appendChild(grid);

const handleClick = (cell) => {
  if (gameOver) {
    return;
  }

  let clicked = event.button;

  let i = +cell.id[0];
  let j = +cell.id[1];

  let bombCount = 0;
  let boxValue = boxValues[i][j];

  if (clicked === 0) {
    if (bombLocation.indexOf(boxValue) !== -1) {
      revealBombs();
      gameOver = true;
      return;
    } else {
      if(cell.classList.contains("correct")) {
        return;
      }
      let safeBox = document.getElementById(cell.id);
      safeBox.classList.add("correct");
      if (i - 1 >= 0 && j - 1 >= 0) {
        if (bombLocation.indexOf(boxValues[i - 1][j - 1]) !== -1) {
          bombCount++;
        }
      }

      if (i - 1 >= 0) {
        if (bombLocation.indexOf(boxValues[i - 1][j]) !== -1) {
          bombCount++;
        }
      }

      if (i - 1 >= 0 && j + 1 <= 8) {
        if (bombLocation.indexOf(boxValues[i - 1][j + 1]) !== -1) {
          bombCount++;
        }
      }

      if (j - 1 >= 0) {
        if (bombLocation.indexOf(boxValues[i][j - 1]) !== -1) {
          bombCount++;
        }
      }

      if (j + 1 <= 8) {
        if (bombLocation.indexOf(boxValues[i][j + 1]) !== -1) {
          bombCount++;
        }
      }

      if (i + 1 <= 8 && j - 1 >= 0) {
        if (bombLocation.indexOf(boxValues[i + 1][j - 1]) !== -1) {
          bombCount++;
        }
      }

      if (i + 1 <= 8) {
        if (bombLocation.indexOf(boxValues[i + 1][j]) !== -1) {
          bombCount++;
        }
      }

      if (i + 1 <= 8 && j + 1 <= 8) {
        if (bombLocation.indexOf(boxValues[i + 1][j + 1]) !== -1) {
          bombCount++;
        }
      }
      score++;
      document.getElementById("score-card").innerHTML = "Score: " + score;
      if(score === 71) {
        revealWinner();
      }
      safeBox.innerHTML = bombCount;
    }
  } else if (clicked === 2) {
    if (bombLocation.indexOf(boxValue) !== -1) {
      let bombCellDetect = document.getElementById(cell.id);
      bombCellDetect.classList.add("error");
      bombCellDetect.innerHTML = "!";
      return;
    }
  }
};

const revealBombs = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (bombLocation.indexOf(boxValues[i][j]) !== -1) {
        let bombCell = document.getElementById(getId(i, j));
        bombCell.innerHTML = "";
        bombCell.classList.remove("error");
        bombCell.classList.add("incorrect");
      }
    }
  }
  setTimeout(() => {
    alert("You lost the Game :(");
  }, 1000);
  return;
};

const revealWinner = () => {
  setTimeout(() => {
    alert("Wow! You are a Champion :)");
  }, 1000);
}