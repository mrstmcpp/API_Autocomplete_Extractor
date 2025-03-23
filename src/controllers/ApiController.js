const ApiService = require("../services/ApiService");
const RateLimiter = require("../utils/RateLimiter");


class ApiController {
    constructor() {
        this.controller = new ApiService();
        this.maxParallelReq = 5;
    }

    async extract() {
        let queries = [..."abcdefghijklmnopqrstuvwxyz"];
        const result = new Set();


        while (queries.length) {
            const batch = queries.splice(0, this.maxParallelReq);
            console.log(`batch: ${batch.join(", ")}`);
            await Promise.all(
                batch.map(async (prefix) => {
                    if (prefix.length > 3) return;

                    await RateLimiter.limiter();

                    try {
                        const names = await this.controller.getHelper(prefix);
                        // console.log(`check for ${query}:`, names.results);
                        if (names && Array.isArray(names.results) && names.results.length > 0) {
                            names.results.forEach((name) => result.add(name));
                            if (!queries.includes(prefix) && prefix.length < 3) {
                                queries.push(prefix);
                            }
                        }
                    } catch (e) {
                        console.error(`Request failed : ${e.message}`);
                    }
                })
            )
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


module.exports = ApiController;

