function Player(playerName, playerMarker) {
    const name = playerName
    const marker = playerMarker
    const play = (i, j, gameboard) => {
        gameboard.setMaker(marker, i, j)
    }

    return {name, play}
}

function Gameboard(results) {
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
    return { start, setMaker}
}

function GameController() {
    let i = 0
    let j = 0
    const player1 = Player('Esther', 'X')
    const player2 = Player('Hamu', '$')
    const results = {
        tie: false,
        won: false,
        playerName: ''
    }
    let player_turn = 'first'
    const gameboard = Gameboard(results)
    gameboard.start()
    while (!results.tie && !results.won) {
        if (player_turn === 'first'){
            results.playerName = player1.name
            i = prompt(`${player1.name}'s turn Enter i number:`)
            j = prompt(`${player1.name}'s turn Enter j number:`)
            player1.play(Number(i), Number(j), gameboard)
            player_turn = 'second'
        } else {
            results.playerName = player2.name
            i = prompt(`${player2.name}'s turn Enter i number:`)
            j = prompt(`${player2.name}'s turn Enter j number:`)
            player2.play(Number(i), Number(j), gameboard)
            player_turn = 'first'
        }
    }
    if (results.tie) {
        console.log(`It's a tie`)
    }

    if (results.won) {
        console.log(`${results.playerName} won`)
    }
}

//GameController()