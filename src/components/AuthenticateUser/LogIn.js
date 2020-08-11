import React,{useState} from 'react';
import {Redirect, useHistory} from "react-router-dom";

const LogIn = (props) => {
    const history = useHistory();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [isUValid,setIsUValid] = useState(false);
    const [isPValid,setIsPValid] = useState(false);
    const [toRedirect, setToRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        error: ""
    });

    const handleInputChange  = (event) => {
        const target = event.target;
        let value = target.value;
        if (target.type === 'text') {
            setUsername(value);
            if(value.length === 0 || value.includes(' '))
                setIsUValid(false);
            else setIsUValid(true);
        } else if (target.type === 'password') {
            setPassword(value);
            if(value.length === 0 || value.includes(' '))
                setIsPValid(false);
            else setIsPValid(true);
        }
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if(!isUValid || !isPValid)
            return;
        props.login(username,password,successHandler,errorHandler);
    };

    const successHandler = (data) => {
        console.log("LogIn: success handler");
        console.log(data);
        setToRedirect(true);
    };
    const errorHandler = (error) => {
        console.log("LogIn: error handler - "+error.message);
        setErrorMessage(() => ({
            error: error.message
        }));
    };

    let errorView = <div/>;
    if (errorMessage.error !== "") {
        errorView = (
            <div className="row">
                <div className="alert alert-danger m-auto" role="alert">
                    <h5>An error has occured</h5>
                    {errorMessage.error}
                </div>
            </div>
        );
    }
    if (toRedirect) {
        return <Redirect to={"/auctions"}/>;
    }

    return (
        <div className="row">
            <div className="col-5 m-auto">
                <div className="card">
                    <div className="card-header bg-dark text-white"><h2>Log in</h2></div>
                    <div className="card-body text-left p-5">
                        <form className="form text-left" onSubmit={onSubmit}>
                            <div className="row">
                                <h5>Username<i hidden={isUValid} className="fa fa-exclamation-circle text-danger ml-2" aria-hidden="true"></i></h5>
                                <input type="text" id="username" name="username" className="form-control" onChange={handleInputChange}/>
                            </div>
                            <div className="row mt-3">
                                <h5>Password<i hidden={isPValid} className="fa fa-exclamation-circle text-danger ml-2" aria-hidden="true"></i></h5>
                                <input type="password" id="password" name="password" className="form-control" onChange={handleInputChange}/>
                            </div>
                            <hr/>
                            <button className="btn bg-info text-white btn-rounded btn-block" type="submit"><h5>Log in</h5></button>
                        </form>
                    </div>
                    <div className="card-footer"><a href="#" onClick={() => history.push('register')}>Register instead?</a> </div>
                </div>
                <hr/>
                <div>
                    {errorView}
                </div>
            </div>
        </div>
    )
};

export default LogIn