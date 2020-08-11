import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import './App.css';
import LogIn from "../AuthenticateUser/LogIn";
import Register from "../AuthenticateUser/Register";
import AuthenticationService from "../../repository/AuthenticationService";
import PlaceBid from "../Bids/BidAdd/placeBid";
import BidsList from "../Bids/BidsList/BidsList";
import AuctionsList from "../AuctionItems/AuctionItemsList/AuctionItemsList"
import AuctionsService from "../../repository/AuctionsService";
import Header from "../Header/Header";
class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      JWT: "",
      secretKey: "",
      keyId: -1,
      auctions: [],
      bids: []
    };
    this.errorView= <div/>
  }

  componentDidMount() {
    console.log('App: componentDidMount')
  }

  login = (username,password,responseHandler,errorHandler) => {
    console.log("App: login");
    AuthenticationService.login(username,password)
        .then(res => {
          this.setState({
            "username":username,
            "JWT":res.data
          });
          responseHandler(res);
        return AuctionsService.getAllAuctions(this.state.JWT);
        })
        .then(data => {
            console.log(data.data);
            this.setState({
                "auctions": data.data
            });
            return AuctionsService.getAllBidsForUser(this.state.JWT);
        })
        .then(data => {
            console.log(data);
            console.log(data.data);
            this.setState({
                "bids":data.data
            });
        })
        .catch(error => {
          console.log(error);
          errorHandler(error);
        });
  };
  register = (username,password,responseHandler,errorHandler) => {
      console.log('App: register');
    AuthenticationService.register(username,password)
        .then(res => {
          this.setState({
            "username":username,
            "JWT":res.data
          });
          responseHandler(res);
            return AuctionsService.getAllAuctions(this.state.JWT);
        })
        .then(res => {
            console.log("auctions received:\n"+res.data);
            this.setState({
                "auctions":res.data
            });
            return AuctionsService.getAllBidsForUser(this.state.JWT);
        })
        .then(res => {
            console.log("bids received:\n"+res.data);
            console.log(res.data);
            this.setState({
                "bids":res.data
            });
        })
        .catch(error => {
            console.log(error);
            errorHandler(error);
        });
  };
  logout = () => {
      console.log('App: logout');
      this.setState({
          username: "",
          JWT: "",
          secretKey: "",
          keyId: -1,
          auctions: [],
          bids: []
      });
  };
  fetchKeyIds = (JWT) => {
      console.log('App: fetchKeyIds');
    AuthenticationService.fetchAllKeyIdsForUser(this.state.JWT)
        .then(res => {
          console.log(res.data);
          let keyid0 = res.data[0];
          this.setState({
            "keyId": keyid0
          });
          return AuthenticationService.fetchKeyWithId(keyid0,this.state.JWT);
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            "secretKey":res.data
          });
        })
        .catch(error => {
          console.log(error)
        })
  };
  fetchKeyWithId = (keyId,JWT) => {
      console.log('App: fetchKeyWithId');
      AuthenticationService.fetchKeyWithId(keyId,this.state.JWT)
      .then(res => {
          console.log(res.data);
          this.setState({
              "secretKey":res.data
          });
      })
          .catch(error => {
              console.log(error)
          })
  };

  loadBids = () => {
      console.log('App: loadBids');
    AuctionsService.getAllBidsForUser(this.state.JWT)
        .then(res => {
          console.log(res);
            this.setState({
                "bids":res.data
            });
        })
        .catch(error => {
          console.log(error)
        });
  };

    loadAuctions = () => {
        console.log('App: loadAuctions');
    AuctionsService.getAllAuctions(this.state.JWT)
        .then(res => {
          console.log(res);
            this.setState({
                "auctions":res.data
            });
        })
        .catch(error => {
          console.log(error)
        });
  };
  placeBid = (bid,successHandler,errorHandler) => {
      console.log('App: placeBid');
      let bidDTO = {};
      let bidamount = bid["bid_amount"].toString();
      if(!bidamount.includes("."))
          bidamount=bidamount+".0";
      bidDTO["bid_id"] = null;
      bidDTO["auction_id"] = bid["auction_id"];
      bidDTO["user_id"] = this.state.username;
      bidDTO["value"] = bidamount;
      console.log(bidDTO);
    let auctionsids = this.state.auctions.map(x => x.auction_id);
    if(!auctionsids.some(x => x === bidDTO.auction_id)){
        console.log("No such auction id!");
        errorHandler({message: bid["auction_id"]+' is not a valid auction id!'});
        return;
    }
    if(this.state.keyId < 0 || this.state.secretKey.length === 0) {
        let keyId = -1;
        let secretKey = "";
        AuthenticationService.fetchAllKeyIdsForUser(this.state.JWT)
            .then(res => {
                console.log(res.data);
                keyId = res.data[0];
                this.setState({
                    "keyId": keyId
                });
                return AuthenticationService.fetchKeyWithId(this.state.JWT, keyId);
            })
            .then(res => {
                console.log(res.data);
                secretKey = res.data;
                this.setState({
                    "secretKey": res.data
                });
                return AuctionsService.placeBid(bidDTO, this.state.JWT, keyId, secretKey)
            })
            .then(res => {
                console.log(res);
                let newBid = res.data;
                this.setState((prevState) => {
                    const newBidsRef = [...prevState.bids, newBid];
                    return {
                        "bids": newBidsRef
                    }
                });
                successHandler(res);
                var newAuctionsRef = this.state.auctions.map(obj => {
                    if(obj.auction_id === newBid.auction_id && obj.currentHighestBidAmmount < newBid.value)
                        obj.currentHighestBidAmmount = newBid.value;
                        return obj;
                });
                this.setState({
                   "auctions":newAuctionsRef
                });
            })
            .catch(error => {
                console.log(error);
                errorHandler(error);
            })
    }
    else {
        AuctionsService.placeBid(bidDTO, this.state.JWT, this.state.keyId, this.state.secretKey)
            .then(res => {
                console.log(res);
                let newBid = res.data;
                this.setState((prevState) => {
                    const newBidsRef = [...prevState.bids, newBid];
                    return {
                        "bids": newBidsRef
                    }
                });
                successHandler(res);
            })
            .catch(error => {
                console.log(error.message);
                errorHandler(error);
            })
    }
  };

render() {
  const routing = (
      <Router>
        <Header logout={this.logout}/>
        <main role="main" className="mt-3">
          <div className="container">

            <Route path={"/login"} exact render={() =>
                <LogIn login={this.login}/>}>
            </Route>
            <Route path={"/register"} exact render={() =>
                <Register register={this.register}/>}>
            </Route>
            <Route path={"/bids/add"} render={()=><PlaceBid onNewBidAdded={this.placeBid} auctions={this.state.auctions} authenticated={this.state.JWT.length > 0 && this.state.username.length > 0}/>}/>

            <Route path={"/bids"} exact render={() =>
                <BidsList bids={this.state.bids} authenticated={this.state.JWT.length > 0 && this.state.username.length > 0}/>}>
            </Route>
            <Route path={"/auctions"} exact render={()=>
              <AuctionsList auctions={this.state.auctions} authenticated={this.state.JWT.length > 0 && this.state.username.length > 0}/>}>
              </Route>
            <Redirect to={"/auctions"}/>
          </div>
        </main>
      </Router>
  );
  return (
      <div className="App">
        <div>
          {routing}
        </div>
        <div>
          {this.errorView}
        </div>
      </div>
  );
};
}

export default App;
