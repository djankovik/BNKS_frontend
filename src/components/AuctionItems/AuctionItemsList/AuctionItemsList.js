import React from 'react';
import AuctionItem from "../AuctionItem/AuctionItem";
import {Link} from "react-router-dom";

const getAuctionItems = (props) => {
    const items = props.auctions.map((item, index) => {
        return (
            <AuctionItem auctionitem={item} key={index}/>
        );
    });

    return (
        <div>
            { props.authenticated &&
            <div className="row">
            <h4 className="text-upper text-left">Auctions</h4>
            <div className="table-responsive col-10 offset-1">
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col">Auction</th>
                        <th scope="col">Item name</th>
                        <th scope="col">Started at</th>
                        <th scope="col">Highest bid</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </table>
            </div>
            </div>
            }
            { !props.authenticated &&
            <div className="alert alert-danger m-auto d-block w-75">
                <h4>The user is not authenticated. Please log in or register to view auction items.</h4>
                <div>
                    <Link className="btn btn-dark text-white pb-1 mt-4" to={"/login"}>Login</Link>
                    <Link className="btn btn-dark text-white pb-1 mt-4 ml-2" to={"/register"}>Register</Link>
                </div>
            </div>
            }
        </div>
    )
};

export default getAuctionItems;
