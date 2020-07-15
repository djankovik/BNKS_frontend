import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import Bid from "../Bid/Bid";

const getBids = (props) => {

    const bids = props.bids.map((bid, index) => {
        return (
            <Bid bid={bid} key={index}/>
        );
    });

    return (
        <div style={{fontSize: "16px"}}>
            {props.authenticated &&
            <div className={"row"}>
            <h4 className="text-upper text-left">My bid history</h4>
            <div className="table-responsive col-10 offset-1">
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col">Bid id</th>
                        <th scope="col">User id</th>
                        <th scope="col">Auction id</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bids}
                    </tbody>
                </table>
            </div>
                <Link className="btn btn-primary pb-1 mt-4 m-auto" to={"/bids/add"}>Place new bid</Link>
            </div>
            }
            { !props.authenticated &&
              <div className="alert alert-danger alert alert-danger m-auto w-75">
                  <h4>The user is not authenticated. Please log in or register to view bids.</h4>
                  <div>
                      <Link className="btn btn-dark text-white pb-1 mt-4" to={"/login"}>Login</Link>
                      <Link className="btn btn-dark text-white pb-1 mt-4 ml-2" to={"/register"}>Register</Link>
                  </div>
              </div>
            }
        </div>
    )
};

export default getBids;
