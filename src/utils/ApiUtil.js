const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();

class ApiUtil {
    constructor() {
        this.apiutil = axios.create({
            baseURL: process.env.API_URL,
            timeout: 5000,
        })
    }

    async getRequest(queryUrl) {
        try {
            const response = await this.apiutil.get(queryUrl);
            return response.data;
        } catch (error) {
            console.log("Some error occurred.");
        }
    }


}


//testing code
// (async () => {
//     const obj = new ApiUtil();
//     const data = await obj.getRequest("http://35.200.185.69:8000/v1/autocomplete?query=");
//     console.log("result:", data);
// })();


module.exports = ApiUtil;