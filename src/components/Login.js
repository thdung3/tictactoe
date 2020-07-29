import React, { Component } from 'react'
import './Login.css'
import { Form } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            size: 3,
            countToWin: 3,
        }
    }

    responseFacebook = (resp) => {
        this.setState({ userName: resp.name })
    }

    login = () => {
        this.props.getDataFromLoginAndInit(this.state)
    }

    myChangeHandle = (e) => {
        this.setState({ userName: e.target.value })
    }

    sizeChangeHandle = (e) => {
        this.setState({ size: parseInt(e.target.value) })
    }
    countChangeHandle = (e) => {
        this.setState({ countToWin: e.target.value })
    }
    render() {
        return (
            <div className="login-background">
                <div className="container col-sm-6">
                    <h1>Login</h1>
                    <label>Username</label>
                    <input id="text-username" className="col-12" type="text" onChange={(e) => this.myChangeHandle(e)} value={this.state.userName}></input>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg" style={{ marginTop: "10px" }}>
                        <Form.Label>Count to win</Form.Label>
                        <Form.Control as="select" size="sm" custom onChange={(e) => this.countChangeHandle(e)}>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                        <Form.Label>Size</Form.Label>
                        <Form.Control as="select" size="sm" custom onChange={(e) => this.sizeChangeHandle(e)}>
                            <option value="3">3x3</option>
                            <option value="4">4x4</option>
                            <option value="5">5x5</option>
                            <option value="6">6x6</option>
                            <option value="7">7x7</option>
                            <option value="8">8x8</option>
                            <option value="9">9x9</option>
                            <option value="10">10x10</option>
                        </Form.Control>
                    </Form.Group>
                    <div id="area-facebook-login">
                        <FacebookLogin
                            autoLoad={false}
                            appId="1180528248964437"
                            fields="name,email,picture"
                            callback={(resp) => this.responseFacebook(resp)}
                        />
                    </div>
                    <div id="area-login">
                        <input id="btn-login" className="col-4" type="submit" value="Login" onClick={() => this.login()} />
                    </div>
                </div>
            </div >
        )
    }
}
