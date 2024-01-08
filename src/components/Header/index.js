import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogOut = () => {
    Cookies.remove('assess_jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-element">
      <div className="logo-cont">
        <img
          src="https://res.cloudinary.com/defacaof3/image/upload/v1704197670/image_28_Traced_tcz4p4.png0"
          alt="website logo"
        />
        <h1 className="nxt">
          NXT <span className="assess">Assess</span>
        </h1>
      </div>
      <button type="button" className="logout-button" onClick={onLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
