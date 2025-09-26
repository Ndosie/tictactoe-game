function Player(playerName, playerMarker) {
    const name = playerName
    const marker = playerMarker
    const play = (i, j, gameboard) => {
        gameboard.setMaker(marker, i, j)
    }

    return {name, play}
}

function GameBoard(results) {
    const board = [[0,0,0], [0,0,0],[0,0,0]]
    const start = () => {
        displayBoard()
    }

    const displayBoard = () => {
        console.table(board)
    }

    const setMaker = (played_maker, i, j) => {
        if (board[i][j] === 0) {
            board[i][j] = played_maker
        }
        checkSameMaker(played_maker)
        checkTie()
        displayBoard()
    }

    const checkSameMaker = (maker) => {
        if (board[0][0] === maker && board[0][1] === maker && board[0][2] === maker) {
            results.won = true
            return
        }
        if (board[1][0] === maker && board[1][1] === maker && board[1][2] === maker) {
            results.won = true
            return
        }
        if (board[2][0] === maker && board[2][1] === maker && board[2][2] === maker) {
            results.won = true
            return
        }
        if (board[0][0] === maker && board[1][0] === maker && board[2][0] === maker) {
            results.won = true
            return
        }
        if (board[0][1] === maker && board[1][1] === maker && board[2][1] === maker) {
            results.won = true
            return
        }
        if (board[0][2] === maker && board[1][2] === maker && board[2][2] === maker) {
            results.won = true
            return
        }
        if (board[0][0] === maker && board[1][1] === maker && board[2][2] === maker) {
            results.won = true
            return
        }
    }

    const checkTie = () => {
        let indexZero = 0
        for (let i = 0; i < 3; i++) {
            indexZero = board[i].indexOf(0)
        }
        if (indexZero === -1) {
            results.tie = true
        }
    }
    return { board, start, setMaker}
}

function GameController() {
    const buttons = document.querySelectorAll('.mark')
    const boardDivs = document.querySelectorAll('#board div')
    const turnDiv = document.querySelector('.turn')

    let player1 = null
    let player2 = null
    const results = {
        tie: false,
        won: false,
        playerName: ''
    }
    let playerTurn = 'first'
    const gameBoard = GameBoard(results)
    gameBoard.start()

    const setButtons = () => {
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const namePlayerOne = document.querySelector('input[name="player1"]').value
                const namePlayerTwo = document.querySelector('input[name="player2"]').value
                const mark = e.target.id
                if (mark === 'x') {
                    player1 = Player(namePlayerOne, 'X')
                    player2 = Player(namePlayerTwo, 'O')
                } else {
                    player1 = Player(namePlayerOne, 'O')
                    player2 = Player(namePlayerTwo, 'X')
                }
                document.querySelector('input[name="player1"]').value = ''
                document.querySelector('input[name="player2"]').value = ''
                turnDiv.innerText = `${player1.name}'s Turn`
            })
        })
    }

    const displayBoard = (board) => {
        for (let i=0; i < board.length; i++) {
            for (let j=0; j < board.length; j++) {
                document.getElementById(`${i}_${j}`).innerText = board[i][j] !== 0 ? board[i][j] : ''
            }
        }
    }

    const resetBoard = (board) => {
        for (let i=0; i < board.length; i++) {
            for (let j=0; j < board.length; j++) {
                board[i][j] = 0
            }
        }
        displayBoard(board)
        gameBoard.start()
    }
    
    const setDivs = () => {
        boardDivs.forEach((div) => {
            div.addEventListener('click', (e) => {
                const divId = e.target.id
                const [i, j] = divId.split('_')
                if(playerTurn === 'first') {
                    results.playerName = player1.name
                    player1.play(i, j, gameBoard)
                    playerTurn = 'second'
                } else {
                    results.playerName = player2.name
                    player2.play(i, j, gameBoard)
                    playerTurn = 'first'
                }
                turnDiv.innerText = playerTurn === 'first' ? `${player1.name}'s Turn` : `${player2.name}'s Turn`
                displayBoard(gameBoard.board)

                if(results.won || results.tie) {
                    resetBoard(gameBoard.board)
                    showResults()
                }
            })
        })
    }

    const showResults = () => {

        if (results.won) {
            turnDiv.innerText = `${results.playerName} won. Click restart to start the game`
            console.log(`${results.playerName} won`)
        }

        if (results.tie) {
            turnDiv.innerText = "It's a tie. Click restart to restart the game"
            console.log(`It's a tie`)
        }
    }

    return { turnDiv, setButtons, setDivs }
}

const restartBtn = document.getElementById('restart-btn')
const gameController = GameController()
gameController.setButtons()
gameController.setDivs()

restartBtn.addEventListener('click', () => {
    gameController.setButtons()
    gameController.setDivs()
    gameController.turnDiv.innerText = "You will see who's Turn Here"
})