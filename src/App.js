import React, { Component } from 'react'
import './App.css';
import Board from './components/Board'
import History from './components/History'
import HighScore from './components/HighScore'
import Login from './components/Login'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            currentPlayer: "X",
            squareList:
                [["", "", ""],
                ["", "", ""],
                ["", "", ""]],
            winner: null,
            gameOver: false,
            history: [],
            move: 1,
            timeStart: null,
            highScore: [],
            countWin: 5,
            size: 6,
            score: 0,
            // page login or main
            page: 'login'
        }
    }
    setParentsState = (object) => {
        console.log('setParentsState')
        this.setState({ ...this.state, ...object })
    }

    postData = async (record) => {
        console.log('*---- postData ----*')
        let data = new URLSearchParams();
        data.append("player", this.state.userName);
        data.append("score", record);
        const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data.toString(),
            json: true
        });
        this.getData()
    }

    getData = async () => {
        console.log('*--- getData ---*')
        const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ ...this.state, highScore: data.items })
    }

    getDataFromLoginAndInit = (data) => {
        console.log('*--- getDataFromLoginAndInit ---*')
        let squareList = []
        for (let i = 0; i < data.size; i++) {
            squareList.push([])
            for (let j = 0; j < data.size; j++) {
                squareList[i].push('')
            }
        }
        let history = []
        history.push({
            squareList: squareList,
            currentPlayer: this.state.currentPlayer,
            winner: this.state.winner,
            gameOver: this.state.gameOver,
            move: this.state.move,
            timeStart: this.state.timeStart
        })
        this.setState({ userName: data.userName, size: data.size, countWin: data.countToWin, page: 'main', history: history, squareList: squareList })
    }

    componentDidMount = () => {
        this.getData()
    }

    render() {
        if (this.state.page === 'login')
            return (
                <div>
                    <Login getDataFromLoginAndInit={this.getDataFromLoginAndInit} />
                </div>
            )
        else
            return (
                <div className="main-background">
                    <h1 style={{ textAlign: "center", fontWeight: "700" }}>Tic Tac Toe</h1>
                    <p className="title">Username: {this.state.userName}</p>
                    {this.state.gameOver ?
                        this.state.winner === null ?
                            <p className="title">Game Over </p>
                            : <p className="title">Winner: {this.state.winner}</p>
                        : <p className="title">Current Player: {this.state.currentPlayer}</p>}

                    <div className="row" style={{ marginTop: "40px" }}>
                        <div id="area-board" className="col-sm-8">
                            <Board
                                squareList={this.state.squareList}
                                setParentsState={this.setParentsState}
                                currentPlayer={this.state.currentPlayer}
                                gameOver={this.state.gameOver}
                                winner={this.state.winner}
                                history={this.state.history}
                                move={this.state.move}
                                postData={this.postData}
                                timeStart={this.state.timeStart}
                                size={this.state.size}
                                countWin={this.state.countWin}
                            />
                        </div>
                        <div className="col-sm-2">
                            <p className="title">History</p>
                            <History history={this.state.history} setParentsState={this.setParentsState} />
                        </div>
                        <div className="col-sm-2">
                            <p className="title">High Score</p>
                            <HighScore highScore={this.state.highScore} />
                        </div>
                    </div>
                </div>
            )
    }
}