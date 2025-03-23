const ApiService = require("../services/ApiService");
const RateLimiter = require("../utils/RateLimiter");


class ApiController {
    constructor() {
        this.controller = new ApiService();
    }

    async extract() {
        const queries = ['a', 'b' , 'c' , 'd' , 'e'];
        const result = new Set();
        let counter = 0;

        for (const query of queries) {
            //for now implementing rate limitinng for 5 queries
            for(let i = 0; i < 20 ; i++){
                await RateLimiter.limiter(counter);
            }

            try{
                const names = await this.controller.getHelper(query);
                // console.log("check:", names.results);

                if (names && Array.isArray(names.results)) {
                    for (const name of names.results) { //extrating each entry
                        result.add(name);
                    }
                } else {
                    console.error("API error:", names);
                }

            }catch (e) {
                console.error(`Request failed : ${counter} === ${e.message}`);
            }
        }

        // console.log("Final res:", result);
        return Array.from(result);
    }
}


//testing code
// (async () => {
//     const controller = new ApiController();
//     const data = await controller.extract();
//     console.log("Test:", data);
// })();


module.exports = ApiController;

