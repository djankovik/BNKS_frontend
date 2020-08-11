import React, {useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';
import {Link} from "react-router-dom";

const PlaceBid = (props) => {

    const emptyBid = {
        auction_id: 1,
        bid_amount: 0.0
    };

    const [bid, setBid] = useState(emptyBid);
    const [isInputValid, setIsInputValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        error: ""
    });
    const [toRedirect, setToRedirect] = useState(false);


    const onFormSubmit = (e) => {
        e.preventDefault();
        const isValid = validateBid(bid);
        if (!isValid) {
            return;
        }
        props.onNewBidAdded(bid, successHandler, errorHandler);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;
        value = Number(target.value);

        const changedBid = {
            ...bid,
            [name]: value
        };
        setBid(changedBid);
        validateBid(changedBid);
    };

    const validateBid = (b) => {
        let isValid = true;
        //validate amount
        if(bid.amount <= 0)
        {
            isValid = false;
        }
        //validate auction_id
        setIsInputValid(isValid);
        return isValid;
    };

    const resetFields = () => {
        setBid(emptyBid);
        setIsInputValid(false);
    };
    const successHandler = (res)=>{
      console.log("PlaceBid: success handler");
      setToRedirect(true)
    };
    const errorHandler = (error) => {
        console.log("PlaceBid: error handler -"+error.message);

        console.log(error);
        setIsInputValid(false);
        setErrorMessage(() => ({
            error: error.message
        }));
    };

    let errorView = <div/>;
    if (errorMessage.error !== "") {
        errorView = (
            <div className="row w-100">
                <div className="alert alert-danger m-auto" role="alert">
                    <h5>An error has occured</h5>
                    {errorMessage.error}
                </div>
            </div>
        );
    }
    if (toRedirect) {
        return <Redirect to={"/bids"}/>;
    }

    return (
        <div>
            {props.authenticated &&
                <div>
            <div className="row">
                <form className="card m-auto col-8 offset-2" onSubmit={onFormSubmit}>
                    <h4 className="text-upper text-left p-4">Place Bid</h4>
                    <div className="form-group row">
                        <label htmlFor="auction_id" className="col-sm-4 offset-sm-1 text-left">For auction (id)</label>
                        <div className="col-sm-6">
                            <input name={"auction_id"} value={bid.auction_id} type="number" className="form-control"
                                   id="auction_id" placeholder="Auction id" onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="bid_amount" className="col-sm-4 offset-sm-1 text-left">Amount</label>
                        <div className="col-sm-6">
                            <input name={"bid_amount"} value={bid.bid_amount} type="number" min="0" step="any"
                                   className="form-control" id="bid_amount" placeholder="Amount"
                                   onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div
                            className="offset-sm-2 col-sm-2  text-center">
                            <button
                                type="submit"
                                disabled={!isInputValid}
                                className="btn btn-primary text-upper">
                                Save
                            </button>
                        </div>
                        <div
                            className="offset-sm-1 col-sm-2  text-center">
                            <button
                                className="btn btn-warning text-upper"
                                type={"button"}
                                onClick={() => resetFields()}>
                                Reset
                            </button>
                        </div>
                        <div
                            className="offset-sm-1 col-sm-2  text-center">
                            <Link className="btn btn-danger text-upper" to={"/auctions"}>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
                    <hr/>
                    <div>
                        {errorView}
                    </div>
                </div>
            }
                { !props.authenticated &&
                <div className="alert alert-danger alert alert-danger m-auto d-block">
                    <h4>The user is not authenticated. Please log in or register to view bids.</h4>
                    <div>
                        <Link className="btn btn-dark text-white pb-1 mt-4" to={"/login"}>Login</Link>
                        <Link className="btn btn-dark text-white pb-1 mt-4 ml-2" to={"/register"}>Register</Link>
                    </div>
                </div>
                }
        </div>
    );
};

export default PlaceBid;
