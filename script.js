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


/
const displayController = (()=> {
    const tileElements = document.querySelectorAll('.tile');
   

    tileElements.forEach((tile)=> {
        tile.addEventListener('click',(e)=> {
            if(gameController.getIsOver()) return;
            gameBoard.
        })
    })

})();

const gameController = (()=> {
    const playerOne = playerFactory('X');
    const playerTwo = playerFactory('O');

    let round = 1;
    let isOver = false;

    //ROUND    this is the main section/
    const playRound = (tileIndex) => {
        gameBoard.setTile(tileIndex, getCurrentPlayerTurn)
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
    const checkWin = () => {
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
        .filter((combination) => combination.includes(fieldIndex))
        .some((possibleCombination) => {
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
    return {getCurrentPlayerTurn, getIsOver, updateGameboard}
})();