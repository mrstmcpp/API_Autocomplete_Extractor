//not in use... made for testing nd debugging
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const COOLDOWN_PERIOD = 60000; //checking second by second


async function rateLim() { //to know about rate limmitng of the API
    let count = 0;
    while(true){
        try{
            const res = await axios.get(`${process.env.API_URL}ta`);
            count++;
            console.log("Success : " , count  , res.status);
        } catch (e) {
            console.error("Error : " , count ,e.response.status , e.data);  // got 429 at 101th request
            //getting details about coolddown period

            if(e.response && e.response.status === 429){
                await new Promise(resolve => setTimeout(resolve , COOLDOWN_PERIOD));
                    count = 0;
            }
            // break;
        }


    }
}

async function rateLimDetails(){
    try{
        const res = await axios.get(`${process.env.API_URL}ta`);
        console.log("data : ", res);
    } catch (e) {
        console.log("error : " , e.message);
    }
}

rateLim();
// rateLimDetails();