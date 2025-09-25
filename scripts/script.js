function Player(playerName, playerMarker) {
    const name = playerName
    const marker = playerMarker
    const play = (i, j, gameboard) => {
        gameboard.setMaker(marker, i, j)
    }

    return {name, play}
}

function GameBoard(results) {
    let board = []

    const start = () => {
        board = [[0,0,0], [0,0,0],[0,0,0]]
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
    const buttons = document.querySelector('button')
    const boardDivs = document.querySelector('#board div')
    const turnDiv = document.querySelector('.turn')

    let player1 = null
    let player2 = null
    let i = 0
    let j = 0
    const results = {
        tie: false,
        won: false,
        playerName: ''
    }
    let playerTurn = 'first'

    const setButtons = () => {
        console.log(buttons)
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const namePlayerOne = document.querySelector('input[name="player1"]').value
                const namePlayerTwo = document.querySelector('input[name="player2"]').value
                const maker = e.target.id
                if (maker = 'x') {
                    player1 = Player(namePlayerOne, 'X')
                    player2 = Player(namePlayerTwo, 'O')
                } else {
                    player1 = Player(namePlayerOne, 'O')
                    player2 = Player(namePlayerTwo, 'X')
                }
            })
        })
    }

    const displayBoard = (board) => {
        for (let i=0; i < board.length; i++) {
            for (let j=0; j < board.length; j++) {
                document.querySelector(`#${i}_${j}`).innerText = board[i][j] !== 0 ? board[i][j] : ''
            }
        }
    }
    
    const setDivs = (gameboard) => {
        boardDivs.forEach((div) => {
            div.addEventListener('click', (e) => {
                const divId = e.target.id
                [i, j] = divId.split('_')
                if(playerTurn === 'first') {
                    results.playerName = player1.name
                    player1.play(i, j, gameboard)
                    playerTurn = 'second'
                } else {
                    results.playerName = player2.name
                    player2.play(i, j, gameboard)
                    playerTurn = 'first'
                }
                turnDiv.innerText(`${results.playerName}'s Turn`)
            })
        })
    }

    return { results, playerTurn, setButtons, displayBoard, setDivs }
}

const resultsDiv = document.querySelector('#results')
const gameController = GameController()
const gameBoard = GameBoard(gameController.results)

gameBoard.start()
gameController.setButtons()


while (!gameController.results.tie && !gameController.results.won) {
    gameController.displayBoard(board)
    gameController.setDivs(board)
}

resultsDiv.style.display = 'flex'
resultsDiv.style.flexDirection = 'column'
resultsDiv.style.alignItems = 'center'

if (gameController.results.tie) {
    resultsDiv.innerText = "It's a tie"
    console.log(`It's a tie`)
}

if (results.won) {
    resultsDiv.innerText = `${results.playerName} won`
    console.log(`${results.playerName} won`)
}