const axios = require("axios");

const MY_TOKEN="8728717577:AAFbXktmNv2wS8crFFKtjvyJ6f7qhBu072Y";
const BASE_URL=`https://api.telegram.org/bot${MY_TOKEN}`;

function getAxiosInstance(){
    return{
        get(method, params){
            return axios.get(`/${method}`,
                {
                    baseURL:BASE_URL,
                    params
                }
            );
        },
        post(method, data){
    return axios.post(`/${method}`, data, {
        baseURL: BASE_URL
    });
}
    }
}

module.exports = { axiosInstance: getAxiosInstance() };