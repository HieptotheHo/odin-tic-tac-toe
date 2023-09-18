const playerFactory = (sign) => {
    //render name + score;
    const score = 0;
    const getSign = () => {
        return sign
    }
    //win thi score + 1;
    const win = () => {
        score+=1;
    }
    return {score, getSign, win}
}
//BOARD OF THE GAME
const gameBoard = (()=> {
    const board = ['','','','','','','','',''];
    
    //Mostly, this gameBoard is only used to interact with the array board above
    //Then, this array board will be used for further interaction
    //Này chủ yếu khi player click thì sẽ set update cái array ở trên
    const setTile = (index, sign) => {
        board[index]  = sign;
        //sign is "X" or "O"
    }

    const getTile = (index) => {
        return board[index];
    }

    const reset = () => {
        for(let i = 0 ;i<board.length;i++) {
            board[i] = '';
        }
    }
    return {getTile, setTile, reset}
})();

//DISPLAY CONTROLER
const displayController = (()=> {
    const tileElements = document.querySelectorAll('.tile');
    const resetButton = document.getElementById('reset-button');
    const message = document.querySelector('#message');

    tileElements.forEach((tile)=> {
        tile.addEventListener('click',(e)=> {
            if(gameController.getIsOver()) return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    })

    const setMessage = (winner) => {
        if(winner === 'Draw') {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
        }
    };

    const setMessageElement = (inputMessage) => {
        message.textContent = inputMessage;
    };

    resetButton.addEventListener('click',(e)=> {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn")
    })


    //UPDATE gameboard này dựa trên entity gameBoard
    const updateGameboard = () => {
        for(let i =0;i<tileElements.length;i++) {
            tileElements[i].textContent = gameBoard.getTile(i);
        }
    }

    return {setMessage, setMessageElement}
})();

//GAME CONTROLER
const gameController = (()=> {
    const playerOne = playerFactory('X');
    const playerTwo = playerFactory('O');

    let round = 1;
    let isOver = false;

    //ROUND    this is the main section/
    const playRound = (tileIndex) => {
        gameBoard.setTile(tileIndex, getCurrentPlayerTurn())
        if(checkWin(tileIndex)) {
            // displayController.setMessage
        }
        round++;
    }

    //PLAYER TURN
    const getCurrentPlayerTurn = () => {
        return round % 2 === 0 ? playerTwo.getSign() : playerOne.getSign();
    }

    //GAME IS OVER OR NOT
    const getIsOver = () => {
        return isOver;
    }
    
    //WIN!!!
    const checkWin = (tileIndex) => {
        const winPossibilites = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        return winPossibilites
        //filter để loại khả năng nào không có cái bước mới vừa đi
        .filter((combination) => combination.includes(tileIndex))
        //some ở đây dùng dể xem có ít nhất 1 pattern nào hợp không
        .some((possibleCombination) => {
            //check pattern đó (là 1 mảng) có index trùng với "O" không hoặc "X" không.
            possibleCombination.every(
                (index) => gameBoard.getTile(index) === getCurrentPlayerTurn()
            )
        })
    }

    //UPDATE GAMEBOARD
    const updateGameboard = () => {
        for(let i = 0;i<tileElements.length;i++) {
            tileElements[i].textContent=gameBoard.getTile(i);
        }
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }
    return {reset, playRound, checkWin, getCurrentPlayerTurn, getIsOver, updateGameboard,}
})();