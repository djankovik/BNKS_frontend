import axios from "../axios/axios"
import CryptoJS from "crypto-js/crypto-js"
const AuctionsService = {

    
    getAllAuctions: (JWT)=> {
        console.log("AuctionsService: axios getAllAuctions");
        return axios.get("https://localhost:8443/api/auction/auctions", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    },
    getAllBidsForUser: (JWT)=> {
        console.log("AuctionsService: axios getAllBidsForUser");
        return axios.get("https://localhost:8443/api/auction/bids", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    },
    placeBid: (bid,JWT,keyId,secretKey) => {
        console.log("AuctionsService: axios placeBid");
        let bid_json = JSON.stringify(bid);
        let keyBytes = CryptoJS.enc.Base64.parse(secretKey);
        let timestamp = (new Date()).getTime();
        let signStr = "POST/api/auction/place_bid"+timestamp.toString()+bid_json.toString();
        let signature = CryptoJS.HmacSHA256(signStr,keyBytes);
        let signature64 = CryptoJS.enc.Base64.stringify(signature);
        console.log('\tbid: '+bid_json);
        console.log('\ttimestamp: '+timestamp);
        console.log('\talgorithm: METHOD+PATH+TIMESTAMP+BODY');
        console.log('\tkeyid: '+keyId);
        console.log('\tsignature: '+signature64.toString());
        return axios.post("https://localhost:8443/api/auction/place_bid",bid_json, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT,
                "X-Timestamp":timestamp.toString(),
                "X-Algorithm":"METHOD+PATH+TIMESTAMP+BODY",
                "X-KeyID":keyId.toString(),
                "X-Signature":signature64.toString()
            }
        });
    }
};

export default AuctionsService;
