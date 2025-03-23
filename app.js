const ApiController = require("./src/controllers/ApiController");

async function main() {
    const app = new ApiController();

    try {
        const data = await app.extract();
        console.log(data);
    } catch (e) {
        console.log(`error`, e);
    }
}

main();