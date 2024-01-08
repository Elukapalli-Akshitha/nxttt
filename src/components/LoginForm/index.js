import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
    isChecked: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('assess_jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({
      isError: true,
      errorMsg: errMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  render() {
    const {isError, errorMsg, isChecked} = this.state
    return (
      <div className="login-route">
        <div className="login-container">
          <center>
            <img src="https://res.cloudinary.com/defacaof3/image/upload/v1704197670/image_28_Traced_tcz4p4.png" />
            <h1 className="nxt">
              NXT <span className="assess">Assess</span>
            </h1>
          </center>
          <form onSubmit={this.submitForm}>
            <div className="input-container">
              <label className="label-element" htmlFor="username">
                USERNAME
              </label>
              <br />
              <input
                id="username"
                type="text"
                placeholder="USERNAME"
                className="input-element"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label className="label-element" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                type={isChecked ? 'text' : 'password'}
                id="password"
                placeholder="PASSWORD"
                className="input-element"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="show-password">
              <input
                type="checkbox"
                className="checkbox-element"
                id="showPassword"
                onClick={this.onShowPassword}
              />
              <label htmlFor="showPassword" className="show-password-label">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {isError && <p className="err-msg">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
