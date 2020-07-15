import axios from "../axios/axios"
import CryptoJS from "crypto-js/crypto-js"
const AuctionsService = {

    getAllAuctions: (JWT)=> {
        console.log("axios getAllAuctions");
        return axios.get("http://localhost:8080/api/auction/auctions", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    },
    getAllBidsForUser: (JWT)=> {
        console.log("axios getAllBidsForUser");
        return axios.get("http://localhost:8080/api/auction/bids", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    },
    placeBid: (bid,JWT,keyId,secretKey) => {
        console.log("axios placeBid");
        let bid_json = JSON.stringify(bid);
        let keyBytes = CryptoJS.enc.Base64.parse(secretKey);
        let timestamp = (new Date()).getTime();
        let signStr = "POST/api/auction/place_bid"+timestamp.toString()+bid_json.toString();
        let signature = CryptoJS.HmacSHA256(signStr,keyBytes);//CryptoJS.HmacSHA256(signStr, secretKey);
        let signature64 = CryptoJS.enc.Base64.stringify(signature);//CryptoJS.enc.Base64.stringify(signature);
        // console.log("X-Timestamp: "+ timestamp);
        // console.log("X-Algorithm: METHOD+PATH+TIMESTAMP+BODY");
        // console.log("X-KeyID: "+keyId);
        // console.log("X-Signature64: "+signature64.toString());
        // console.log("X-Signature: "+signature.toString());

        return axios.post("http://localhost:8080/api/auction/place_bid",bid_json, {
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
