import React, { Component } from 'react'

export default class Square extends Component {
    selectSquare = () => {
        console.log('*--- selectSquare ---*')
        const array = this.props.squareList
        const x = this.props.x
        const y = this.props.y
        const history = this.props.history
        if (array[x][y] === "" && !this.props.gameOver) {
            let nextPlayer = ''
            if (this.props.currentPlayer === "X") {
                array[x][y] = "X"
                nextPlayer = "O"
            } else {
                array[x][y] = "O"
                nextPlayer = "X"
            }
            let winner = this.calculateWinner(array, x, y)
            console.log('history:', history)
            history.push({ squareList: array, currentPlayer: nextPlayer, winner: winner, gameOver: winner !== null ? true : false })
            this.props.setParentsState({ squareList: array, currentPlayer: nextPlayer, winner: winner, gameOver: winner !== null ? true : false, history: history })
        }

    }

    calculateWinner = (array, x, y) => {
        //check the horizontal
        let count = 1;
        for (let i = 1; i < 3; i++) {
            if (y + i > 2) break;
            if (array[x][y + i] !== array[x][y]) break;
            count++
        }
        for (let i = 1; i < 3; i++) {
            if (y - i < 0) break;
            if (array[x][y - i] !== array[x][y]) break;
            count++
        }
        if (count === 3) {
            return array[x][y]
        }

        // check the vertical
        count = 1;
        for (let i = 1; i < 3; i++) {
            if (x + i > 2) break;
            if (array[x + i][y] !== array[x][y]) break;
            count++
        }
        for (let i = 1; i < 3; i++) {
            if (x - i < 0) break;
            if (array[x - i][y] !== array[x][y]) break;
            count++
        }
        if (count === 3) {
            return array[x][y]
        }
        // check X direction: left-top -> right-bottom
        count = 1;
        for (let i = 1; i < 3; i++) {
            if (x + i > 2 || y + i > 2) break;
            if (array[x + i][y + i] !== array[x][y]) break;
            count++
        }
        for (let i = 1; i < 3; i++) {
            if (x - i < 0 || y - i < 0) break;
            if (array[x - i][y - i] !== array[x][y]) break;
            count++
        }
        if (count === 3) {
            return array[x][y]
        }

        // check X direction: left-bottom -> right-top
        count = 1;
        for (let i = 1; i < 3; i++) {
            if (x - i < 0 || y + i > 2) break;
            if (array[x - i][y + i] !== array[x][y]) break
            count++
        }
        for (let i = 1; i < 3; i++) {
            if (x + i > 2 || y - i < 0) break;
            if (array[x + i][y - i] !== array[x][y]) break;
            count++
        }
        if (count === 3) {
            return array[x][y]
        }
        return null
    }

    render() {
        return (
            <div className="square" onClick={() => this.selectSquare()}>
                <p>{this.props.squareList[this.props.x][this.props.y]}</p>
            </div>
        )
    }
}
