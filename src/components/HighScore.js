import React, { Component } from 'react'

export default class HighScore extends Component {
    render() {
        return (
            <div>
                {this.props.highScore.map(item => {
                    return (
                        <p>{item.player}:{item.score}</p>
                    )
                })}
            </div>
        )
    }
}
