const dotenv = require("dotenv");
const ApiUtil = require("../utils/ApiUtil");

dotenv.config();

class ApiService {
    constructor() {
        this.apiutil = new ApiUtil();
    }

    async getHelper(query) {
        try {
            const data = await this.apiutil.getRequest(process.env.API_URL + `${query}`);
            if (data) {
                return data;
            }
        } catch (e) {
            console.log(e.messages);

        }
    }
}

//testing code
// (async () => {
//     const serv = new ApiService();
//     const res = await serv.getHelper("b")
//     console.log("result" , res.results);
// })

module.exports = ApiService;