import axios from "../axios/axios"

const AuthenticationService = {

    login: (username,password)=> {
        console.log("AuthenticationService: axios login");
        let userdto = JSON.stringify({"username":username,"password":password});

        return axios.post("https://localhost:8443/api/users/login",userdto, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    },
    register: (username,password) => {
        console.log("AuthenticationService: axios register");
        let userdto = JSON.stringify({"username":username,"password":password});

        return axios.post("https://localhost:8443/api/users/register",userdto, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    },
    fetchKeyWithId: (JWT,keyId) => {
        console.log("AuthenticationService: axios fetchKeyWithId");
        console.log(keyId);
        return axios.get(`https://localhost:8443/api/users/fetch?keyId=${keyId}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    },
    fetchAllKeyIdsForUser: (JWT) => {
        console.log("AuthenticationService: axios fetchAllKeyIdsForUser");
        return axios.get(`https://localhost:8443/api/users/fetchall`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    }
};

export default AuthenticationService;
