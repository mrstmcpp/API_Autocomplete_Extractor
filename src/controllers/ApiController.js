const ApiService = require("../services/ApiService");
const RateLimiter = require("../utils/RateLimiter");


class ApiController {
    constructor() {
        this.controller = new ApiService();
    }

    async extract() {
        // const queries = ['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'];
        const queries = this.genQuery();
        const result = new Set();
        // let counter = 0;

        for (const query of queries) {
            //for now implementing rate limitinng for 5 queries
            // for(let i = 0; i < 20; i++){
            // }
            // await RateLimiter.limiter(counter % 100 === 0);
            await RateLimiter.limiter();

            try{
                const names = await this.controller.getHelper(query);
                // console.log(`check for ${query}:`, names.results);
                if (names && Array.isArray(names.results)) {
                    for (const name of names.results) { //extrating each entry
                        result.add(name);
                    }
                } else {
                    console.error("API error:", names);
                }
            }catch (e) {
                console.error(`Request failed : ${e.message}`);
            }
        }
        // console.log("Final res:", result);
        console.log(result.size);
        return Array.from(result);
    }

    genQuery(){
        const words = "abcdefghijklmnopqrstuvwxyz";
        const queries = [];

        for(const w1 of words){
            queries.push(w1);
        }

        for(const w1 of words){
            for(const w2 of words){
                queries.push(w1 + w2);
            }
        }

        for(const w1 of words){
            for(const w2 of words){
                for(const w3 of words){
                    queries.push(w1 + w2 + w3);
                }
            }
        }
        return queries;
    }
}


//testing code
// (async () => {
//     const controller = new ApiController();
//     const data = await controller.extract();
//     console.log("Test:", data);
// })();


module.exports = ApiController;

