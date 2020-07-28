import React, { Component } from 'react'
import './App.css';
import Board from './components/Board'
import History from './components/History'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPlayer: "X",
            squareList:
                [["", "", ""],
                ["", "", ""],
                ["", "", ""]],
            winner: null,
            gameOver: false,
            history: [{}]
        }
    }
    setParentsState = (object) => {
        console.log('setParentsState.object.history:', object.squareList)
        this.setState(object)
    }

    render() {
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                {this.state.gameOver ? <p>Winner: {this.state.winner}</p> : <p>Current Player: {this.state.currentPlayer}</p>}
                <div className="row">
                    <Board className="col-sm-8"
                        squareList={this.state.squareList}
                        setParentsState={this.setParentsState}
                        currentPlayer={this.state.currentPlayer}
                        gameOver={this.state.gameOver}
                        winner={this.state.winner}
                        history={this.state.history}
                    />
                    <div className="col-sm-3">
                        <p>History</p>
                        <History history={this.state.history} setParentsState={this.setParentsState} />
                    </div>

                </div>
            </div>
        )
    }
}