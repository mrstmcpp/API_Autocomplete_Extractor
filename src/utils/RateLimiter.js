const dotenv = require("dotenv")
dotenv.config()

const COOLDOWN_PERIOD = 60000;
const lim = 100;


class RateLimiter{
    constructor() {
        this.limit = lim; //100 requests at once
        this.cooldowntime = COOLDOWN_PERIOD; //cooldown period obtained by testing
        this.counter = 0;
    }

    async limiter(){
        this.counter++;
        // console.log(`Request Count: ${this.counter}/${lim}`);

        if(this.counter >= this.limit){
            console.log(`Rate Limit reached! Please Wait... ${this.cooldowntime / 1000} seconds`)
            await new Promise(resolve => setTimeout(resolve , this.cooldowntime)); //sending reqs again
            console.log("Resuming...")
            this.counter = 0;
        }
    }
}

//tester
// (async () => {
//     const controller = new RateLimiter();
//     const data = await controller.limiter();
//     console.log("Test: ");
// })();


module.exports = new RateLimiter();