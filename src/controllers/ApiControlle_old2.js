const ApiService = require("../services/ApiService");
const RateLimiter = require("../utils/RateLimiter");


class ApiControlle_old2 {
    constructor() {
        this.controller = new ApiService();
    }

    async extract() {
        const queries = [..."abcdefghijklmnopqrstuvwxyz"];
        const result = new Set();


        while (queries.length) {
            const prefix = queries.shift();
            if(prefix.length > 3){
                continue;
            }

            await RateLimiter.limiter();

            try{
                const names = await this.controller.getHelper(prefix);
                // console.log(`check for ${query}:`, names.results);
                if (names && Array.isArray(names.results)) {
                    for (const name of names.results) { //extrating each entry
                        result.add(name);

                        if (name.length <= 3 && !queries.includes(name)) {
                            queries.push(name);
                        }
                    }
                }
            }catch (e) {
                console.error(`Request failed : ${e.message}`);
            }
        }
        // console.log("Final res:", result);
        console.log(result.size);
        return Array.from(result);
    }

}


//testing code
// (async () => {
//     const controller = new ApiController();
//     const data = await controller.extract();
//     console.log("Test:", data);
// })();


module.exports = ApiControlle_old2;

