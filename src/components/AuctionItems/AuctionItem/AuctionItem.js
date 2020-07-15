import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AuctionItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.auctionitem.auction_id}</td>
                <td>{this.props.auctionitem.itemName}</td>
                <td>{this.props.auctionitem.auctionStartedAtAmmount}</td>
                <td>{this.props.auctionitem.currentHighestBidAmmount}</td>
            </tr>
        );
    }
}

export default AuctionItem;
