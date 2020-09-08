let round = 0;
const main = document.getElementById("main");
const playerInfo = document.getElementById("player-info");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

function restart() {
    playerInfo.classList.remove("no-disp");
    p1.classList.remove("blink");
    p2.classList.remove("blink");
    player1.value = p1.innerText;
    player2.value = p2.innerText;

    for (child of main.children) {
        child.innerText = "";
    };
}

const board = (() => {

    let gameOver = false;
    let positions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let winPos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    let player1pos = [];
    let player2pos = [];

    const initialize = () => {
        positions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        winPos = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];

        round = 0;
        player1pos = [];
        player2pos = [];
        gameOver = false;
    }

    const success = (inArr) => {
        let found = false;

        if (inArr.length > 2) {
            for (let ind = 0; ind < winPos.length; ind++) {
                for (let i = 0; i < winPos[ind].length; i++) {
                    if (!inArr.includes(winPos[ind][i])) {
                        found = false;
                        break;
                    }
                    found = true;
                }

                if (found) { break; }
            }
        }

        return found;
    }

    const setPosition = (pos) => {

        if (round % 2 == 0) {
            positions[pos] = "x";
            player1pos.push(pos + 1);

            if (success(player1pos)) {
                alert("#{player1} wins");
                gameOver = true;
            }
        } else {
            positions[pos] = "O";
            player2pos.push(pos + 1);

            if (success(player2pos)) {
                alert("#{player2} wins");
                gameOver = true;
            }
        }

        round++;

        if (round === 9) {
            gameOver = true;
            alert("tie");
        }

        if (gameOver) {
            restart();
        }
    }

    return {
        initialize,
        setPosition
    };
})();

function onSubmit() {
    let p1Val = player1.value;
    let p2Val = player2.value;

    p1.innerText = p1Val;
    p2.innerText = p2Val;

    playerInfo.classList.add("no-disp");

    board.initialize();
    p1.classList.add("blink");
}

function setPosition(event) {
    let currentPos = event.currentTarget;

    if (currentPos.innerText === "x" || currentPos.innerText === "o") {
        return;
    } else {
        if (round % 2 == 0) {
            currentPos.innerText = "x";
            document.getElementById("p1").classList.remove("blink");
            document.getElementById("p2").classList.add("blink");
        } else {
            currentPos.innerText = "o";
            document.getElementById("p1").classList.add("blink");
            document.getElementById("p2").classList.remove("blink");
        }

        board.setPosition(parseInt(currentPos.getAttribute("data-pos")));
    }
}

function onPageLoad() {
    for (let index = 0; index < 9; index++) {
        let div = document.createElement("div");
        div.setAttribute("data-pos", index);
        div.addEventListener("click", setPosition);
        main.appendChild(div);
    }
}