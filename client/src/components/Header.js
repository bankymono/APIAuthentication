import React, { Component } from 'react'
import{Link} from 'react-router-dom'

class Header extends Component {

    render() {
        return (
            <nav style={{marginBottom:"30px"}} className="navbar navbabr-expand-lg navbar-dark bg-dark">
                <Link  to="/" className="navbar-brand">CodeWorkr API Auth</Link>

                <div className="navbar navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="dashboard"className="nav-link">Dashboard</Link>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="signin" className="nav-link">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="signout" className="nav-link">Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header
