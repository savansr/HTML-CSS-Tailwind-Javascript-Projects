let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn0 = true;
let moves = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === "") {
            box.innerText = turn0 ? "O" : "X";
            box.style.color = turn0 ? "green" : "red";
            turn0 = !turn0;
            box.disabled = true;
            moves++;
            checkWinner();
        }
    })
})

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    msgContainer.classList.add("hide");
    moves = 0;
}

const resetGame = () => {
    turn0 = true;
    enableBoxes();
}

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                disableBoxes();
                return;
            }
        }
    }
    if (moves === 9) {
        msg.innerHTML = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
}

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
