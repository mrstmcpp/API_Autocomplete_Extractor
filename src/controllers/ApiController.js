const ApiService = require("../services/ApiService");

class ApiController {
    constructor() {
        this.controller = new ApiService();
    }

    async extract() {
        const queries = ['a', 'b'];
        const result = new Set();

        for (const query of queries) {
            const names = await this.controller.getHelper(query);
            // console.log("check:", names.results);

            if (names && Array.isArray(names.results)) {
                for (const name of names.results) {
                    result.add(name);
                }
            } else {
                console.error("Unexpected API response format:", names);
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

