import React, { Component } from 'react'

export default class Square extends Component {
    selectSquare = () => {
        console.log('*--- selectSquare ---*')
        const array = this.props.squareList.slice().map(function (row) { return row.slice(); });
        const x = this.props.x
        const y = this.props.y

        let gameOver = this.props.gameOver
        let timeStart = this.props.timeStart
        if (array[x][y] !== "") return
        if (this.props.gameOver) return
        // if (array[x][y] === "" && !this.props.gameOver) {
        let move = this.props.move
        const history = this.props.history.splice(0, move).slice()
        if (move === 1) {
            timeStart = Date.now()
        }
        let nextPlayer = ''
        if (this.props.currentPlayer === "X") {
            array[x][y] = "X"
            nextPlayer = "O"
        } else {
            array[x][y] = "O"
            nextPlayer = "X"
        }
        let winner = this.calculateWinner(array, x, y)

        // Post new record
        if (winner !== null) {
            let timeEnd = Date.now();
            let record = Math.round((timeEnd - timeStart) / 1000)
            console.log('record:', record)
            this.props.postData(record)
        }
        gameOver = winner !== null ? true : false
        let fullSquare = true;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === '') {
                    fullSquare = false
                    break;
                }
            }
            if (!fullSquare) break
        }
        move++
        if (fullSquare) gameOver = true
        history.push({ squareList: array, currentPlayer: nextPlayer, winner: winner, gameOver: gameOver, move: move, timeStart: timeStart })
        this.props.setParentsState({ squareList: array, currentPlayer: nextPlayer, winner: winner, gameOver: gameOver, history: history, move: move, timeStart: timeStart })
        // }
    }

    calculateWinner = (array, x, y) => {
        //check the horizontal
        let count = 1;
        for (let i = 1; i < this.props.countWin; i++) {
            if (y + i > this.props.size - 1) break;
            if (array[x][y + i] !== array[x][y]) break;
            count++
        }
        for (let i = 1; i < this.props.countWin; i++) {
            if (y - i < 0) break;
            if (array[x][y - i] !== array[x][y]) break;
            count++
        }
        if (count === this.props.countWin) {
            return array[x][y]
        }

        // check the vertical
        count = 1;
        for (let i = 1; i < this.props.countWin; i++) {
            if (x + i > this.props.size - 1) break;
            if (array[x + i][y] !== array[x][y]) break;
            count++
        }
        for (let i = 1; i < this.props.countWin; i++) {
            if (x - i < 0) break;
            if (array[x - i][y] !== array[x][y]) break;
            count++
        }
        if (count === this.props.countWin) {
            return array[x][y]
        }
        // check X direction: left-top -> right-bottom
        count = 1;
        for (let i = 1; i < this.props.countWin; i++) {
            if (x + i > this.props.size - 1 || y + i > this.props.size - 1) break;
            if (array[x + i][y + i] !== array[x][y]) break;
            count++
        }
        for (let i = 1; i < this.props.countWin; i++) {
            if (x - i < 0 || y - i < 0) break;
            if (array[x - i][y - i] !== array[x][y]) break;
            count++
        }
        if (count === this.props.countWin) {
            return array[x][y]
        }

        // check X direction: left-bottom -> right-top
        count = 1;
        for (let i = 1; i < this.props.countWin; i++) {
            if (x - i < 0 || y + i > this.props.size - 1) break;
            if (array[x - i][y + i] !== array[x][y]) break
            count++
        }
        for (let i = 1; i < this.props.countWin; i++) {
            if (x + i > this.props.size - 1 || y - i < 0) break;
            if (array[x + i][y - i] !== array[x][y]) break;
            count++
        }
        if (count === this.props.countWin) {
            return array[x][y]
        }
        return null
    }

    render() {
        return (
            <div className="square" style={{ width: `${parseInt(780 / this.props.size)}px`, height: `${parseInt(780 / this.props.size)}px` }} onClick={() => this.selectSquare()}>
                {this.props.squareList[this.props.x][this.props.y] === 'X' ?
                    <p className="square-value"
                        style={{ fontSize: `${parseInt(600 / this.props.size)}px`, color: "blue" }}>
                        {this.props.squareList[this.props.x][this.props.y]}
                    </p>
                    :
                    <p className="square-value"
                        style={{ fontSize: `${parseInt(600 / this.props.size)}px`, color: "orange" }}>
                        {this.props.squareList[this.props.x][this.props.y]}
                    </p>
                }
            </div>
        )
    }
}
