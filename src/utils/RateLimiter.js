class RateLimiter{
    constructor() {
        this.limit = 100; //100 requests at once
        this.cooldowntime = 36000; //cooldown period obtained by testing
    }

    async limiter(counter){
        if(counter === this.limit){
            console.log(`Rate Limit reached! Please Wait... ${this.cooldowntime} / 1000 seconds`)
            await new Promise(resolve => setTimeout(resolve , this.cooldowntime)); //sending reqs again
        }
    }
}

module.exports = new RateLimiter();