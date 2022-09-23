# url-shortener

This repo consists of a backend and frontend folder that runs differently. Tech stack being used is MERN stack. Do ensure that `Node.js` is installed before attempting to run the backend and frontend server locally.

# Backend

To start the backend server locally

1. Open up a terminal at the backend directory
2. Run command `npm install`
3. Create a `.env` file in the directory
4. Specify `NODE_ENV` value, `PORT` value, `DB_URL` value and `TEST_DB_URL` value in the `.env` file. `DB_URL` and `TEST_DB_URL` are the connection string required for MongoDB and they have to be of different values to ensure normal environment and test environment works as intended. An example can be shown below.
```
NODE_ENV=production
PORT=3000
DB_URL={insert mongodb connection url here}
TEST_DB_URL={insert mongodb connection url here}
```
5. Run command `node index.js`. Upon running `node index.js`, backend server would be started up on localhost port 3000 and API calls can be made to the backend server. Alternatively, backend server has been deployed to heroku as well and API calls can be made to `https://mighty-sands-84969.herokuapp.com/`. Making a GET request to `https://mighty-sands-84969.herokuapp.com/urlShortener` will retrieve all the urls that have already been shortened.

6. For running tests, run command `npm run test` and the written test cases will be ran and checked for pass/failure

# Frontend

To start the frontend

1. Open up a terminal at the frontend directory
2. Run command `npm install`
3. Run command `npm start`. Upon running `npm start`, frontend would be started up on localhost port 3001. Browser window would also pop up as well showing the frontend.
4. Alternatively, frontend server has been deployed to gh-pages and can be accessed through this link (`https://ongweisheng.github.io/url-shortener/`)