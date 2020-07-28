import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    render() {
        return (
            <div>
                {this.props.squareList.map((itemI, indexI) => {
                    return (
                        <div className="square-row">
                            {itemI.map((itemJ, indexJ) => {
                                return (
                                    <Square
                                        x={indexI}
                                        y={indexJ}
                                        squareList={this.props.squareList}
                                        setParentsState={this.props.setParentsState}
                                        currentPlayer={this.props.currentPlayer}
                                        gameOver={this.props.gameOver}
                                        winner={this.props.winner}
                                        history={this.props.history}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div >
        )
    }
}
