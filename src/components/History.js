import React, { Component } from 'react'

export default class History extends Component {
    callHistory = (move) => {
        console.log('callHistory')
        let moveHistory = this.props.history[move]
        this.props.setParentsState(moveHistory)
    }
    render() {
        // console.log('History.props:', this.props)
        return (
            <div>
                {this.props.history.map((item, index) => {
                    return (
                        <button type="text" onClick={() => this.callHistory(index)} >Go to move {index}</button>
                    )
                })}
            </div >
        )
    }
}
