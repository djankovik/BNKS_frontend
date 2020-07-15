import React, {Component} from 'react';

class Bid extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.bid.bid_id}</td>
                <td>{this.props.bid.user_id}</td>
                <td>{this.props.bid.auction_id}</td>
                <td>{this.props.bid.value}</td>
            </tr>
        );
    }
}

export default Bid;
