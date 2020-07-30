import React, { Component } from 'react'

export default class History extends Component {
    callHistory = (move) => {
        let moveHistory = this.props.history[move]
        this.props.setParentsState(moveHistory)
    }
    render() {
        console.log('this.props:', this.props)
        return (
            <div>
                {this.props.history.map((item, index) => {
                    return (
                        // <button type="text" onClick={() => this.callHistory(index)} >Go to move {index}</button>
                        <input id="btn-history" type="submit" onClick={() => this.callHistory(index)} value={`Go to move ${index}`} />
                    )
                })}
            </div >
        )
    }
}
