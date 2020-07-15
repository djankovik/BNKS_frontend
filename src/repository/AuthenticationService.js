import axios from "../axios/axios"

const AuthenticationService = {

    login: (username,password)=> {
        console.log("axios login");
        let userdto = JSON.stringify({"username":username,"password":password});

        return axios.post("http://localhost:8080/api/users/login",userdto, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    },
    register: (username,password) => {
        console.log("axios register");
        let userdto = JSON.stringify({"username":username,"password":password});

        return axios.post("http://localhost:8080/api/users/register",userdto, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    },
    fetchKeyWithId: (JWT,keyId) => {
        console.log("axios fetchKeyWithId");
        console.log(keyId);
        return axios.get(`http://localhost:8080/api/users/fetch?keyId=${keyId}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    },
    fetchAllKeyIdsForUser: (JWT) => {
        console.log("axios fetchAllKeyIdsForUser");
        return axios.get(`http://localhost:8080/api/users/fetchall`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authentication': JWT
            }
        });
    }
};

export default AuthenticationService;
