const dotenv = require("dotenv")
dotenv.config()


class RateLimiter{
    constructor() {
        this.limit = process.env.API_REQ_LIMIT; //100 requests at once
        this.cooldowntime = process.env.API_COOLDOWN_PERIOD; //cooldown period obtained by testing
    }

    async limiter(counter){
        if(counter === this.limit){
            console.log(`Rate Limit reached! Please Wait... ${this.cooldowntime} / 1000 seconds`)
            await new Promise(resolve => setTimeout(resolve , this.cooldowntime)); //sending reqs again
        }
    }
}

module.exports = new RateLimiter();