const ApiService = require("../services/ApiService");
const RateLimiter = require("../utils/RateLimiter");
const fs = require("fs");


class ApiController {
    constructor() {
        this.controller = new ApiService();
        this.maxParallelReq = 20;
        this.totalRequests = 0;
        this.totalResults = 0;

    }

    async extract() {
        const queries = [..."abcdefghijklmnopqrstuvwxyz"];

        for (const c1 of "abcdefghijklmnopqrstuvwxyz") {
            for (const c2 of "abcdefghijklmnopqrstuvwxyz") {
                queries.push(c1 + c2);
            }
        }

        for (const c1 of "abcdefghijklmnopqrstuvwxyz") {
            for (const c2 of "abcdefghijklmnopqrstuvwxyz") {
                for (const c3 of "abcdefghijklmnopqrstuvwxyz") {
                    queries.push(c1 + c2 + c3);
                }
            }
        }
        const cache = new Set();
        const result = new Set();

        while (queries.length) {
            const batch = queries.splice(0, this.maxParallelReq);
            console.log(`batch: ${batch.join(", ")}`);
            await Promise.all(
                batch.map(async (prefix) => {
                    if (cache.has(prefix)) return;
                    cache.add(prefix);

                    await RateLimiter.limiter(result.size);

                    try {
                        this.totalRequests++;
                        const names = await this.controller.getHelper(prefix);
                        // console.log(`check for ${query}:`, names.results);
                        if (names && Array.isArray(names.results) && names.results.length > 0) {

                            names.results.forEach((name) => {
                                if(!result.has(name)){
                                    result.add(name);
                                    this.totalResults++;
                                }
                            });



                            fs.writeFileSync("results.json", JSON.stringify([...result], null, 2));
                        }
                    } catch (e) {
                        console.error(`Request failed : ${e.message}`);
                    }
                })
            )
        }
        // console.log("Final res:", result);
        console.log(result.size);
        fs.writeFileSync("results.json", JSON.stringify([...result], null, 2));
        // console.log(JSON.stringify(Array.from(result), null, 2));
        // return Array.from(result);
        console.log(`Total Requests : ${this.totalRequests} , Total Results : ${this.totalResults}` );
    }

}


//testing code
// (async () => {
//     const controller = new ApiController();
//     const data = await controller.extract();
//     console.log("Test:", data);
// })();


module.exports = ApiController;

