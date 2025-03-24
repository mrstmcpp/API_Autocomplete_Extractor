# Autocomplete API Extractor

This project efficiently extracts all possible words from an **autocomplete API** while handling rate limits, optimizing API calls, and ensuring scalability.

## Project Overview
The autocomplete API:
- **Only accepts queries up to 3 characters(for 4 it returns same output which is already covered while exploring first 3 letters)** (`"a"`, `"ab"`, `"abc"`).
- **Returns words of any length**.
- **Limits API calls to 100 at a time** (then enforces a 60s cooldown).

### **Rate Limiting**
- After **100 requests**, the API blocks further calls (`429 Too Many Requests`).
- **To reset:** Wait **60 seconds** before bulk requests resume.

To efficiently extract all words, we used **query expansion, parallel requests, caching, and rate limiting**.

## Approach
- Since, using bruteforce could go beyond 17k+ queries which would take hours to complete. We used BFS based query expansion.
- Seperated works in single files so that it is scalable without much changes. Used SOLID principles.
- Applied rate limiting strategies.
- Used parallel requests for faster execution.
- Cached API Responses.

## Project Structure

autocomplete-extractor/
│── /src
│   │
│   ├── /controllers          # Handles high-level logic & query expansion
│   │   ├── ApiController.js  # Manages extraction workflow & API interactions
│   │
│   ├── /services             # Handles business logic & API communication
│   │   ├── ApiService.js     # Sends requests to API, handles responses & retries
│   │
│   ├── /utils                # Utility functions for support tasks
│   │   ├── RateLimiter.js    # Implements rate limiting & cooldown handling
│   │   ├── ApiUtil.js        # Api get requests calling helper
│   │
├── app.js              # Main entry point to start extraction
│── package.json              # Project dependencies & scripts
│── README.md                 # Documentation for setup & usage
│── .env                      # Stores API settings (rate limits, cooldown time)


## How to run
### **Follow the steps**
```sh
npm install

API_URL=http://your-api-url/v1/autocomplete?query=
API_REQ_LIMIT=100
API_COOLDOWN_PERIOD=60000  # 60 seconds

node app.js
