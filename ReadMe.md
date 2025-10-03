# TIC TAC TOE GAME
It's a game where two players play by placing markers on a 3 x 3 board. The winner is determined when a player has 3 in row of his/her marker either horizontally, vertically or diagonally.

## Pseudocodes
### General
1. Set tie and won to false
2. Set player’s turn to first player
3. Set first player name and marker
4. Set second player name and marker
5. Start the game
6. While tie is false or won is false
    1. If player turn is first player
    2. First player play
    3. Set player turn to second player
    4. Second player play
    5. Set player turn to first player
7. If tie is true
    1. Print it is a tie
8. If won is true
    1. If player turn is first player
    2. Print first players’ name won
    3. else
    4. Print second players’ name won
9. Set won to false
10. Set tie to false
11. Set player turn to first player
12. Set marker to empty string
### Start function
1. Set the 3 by 3 of zeros
### Display board function
1. Set outer counter to 0
2. While outer counter is less than 3
    1. Set inner counter to zero
    2. While inner counter is less than 3
    3. Output mark at position (outer counter, inner counter)
### Play Function 
1. Get position
2. Set maker at position
### Set Maker function
1. Get position to put the marker
2. Get marker
3. If there is no marker at the position
4. Set marker at the position
5. Check 3 markers in rows
6. Check tie()
7. Display board
### Check 3 in row function
1. Get marker
2. If all markers at positions[(0,0),(0,1),(0,2)] are equal to marker
    1. Set won to true
    2. return
3. If all markers at positions[(1,0),(1,1),(1,2)] are equal to marker
    1. Set won to true
    2. return
4. If all markers at positions[(2,0),(2,1),(2,2)] are equal to marker
    1. Set won to true
    2. return
5. If all markers at positions[(0,0),(1,0),(2,0)] are equal to marker
    1. Set won to true
    2. return
6. If all markers at positions[(0,1),(1,1),(2,1)] are equal to marker
    1. Set won to true
    2. return
7. If all markers at positions[(0,2),(1,2),(2,2)] are equal to marker
    1. Set won to true
    2. return
8. If all markers at positions[(0,0),(1,1),(2,2)] are equal to marker
    1. Set won to true
    2. return
9. If all markers at positions[(0,2),(1,1),(2,0)] are equal to marker
    1. Set won to true
    2. return

### Check tie function
1. Set counter to zero
2. While counter is less than 3
3. Get index of zero at counter
4. If index is equal to -1
5. Set tie to true

Go ahead and play [here](https://ndosie.github.io/tictactoe-game/).