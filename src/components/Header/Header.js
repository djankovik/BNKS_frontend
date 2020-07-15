import React from "react";
import {Link} from "react-router-dom";
const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand mr-3" style={{fontSize: "30px"}}>BNKS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto" style={{fontSize: "20px"}}>
                        <li className="nav-item">
                            <Link className="nav-link mr-3" to={"/auctions"}>Auctions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/bids"}>Bids</Link>
                        </li>
                    </ul>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                        <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Log in</Link>
                        <Link className="btn btn-outline-info my-2 my-sm-0 ml-3" to={"/register"}>Register</Link>
                        <button className="btn btn-outline-info my-2 my-sm-0 ml-3" onClick={() => props.logout()}>Log out</button>
                    </form>
                </div>
            </nav>
        </header>
    )
}
export default Header;