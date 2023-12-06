const USER_API = require('./userRoutes');
const GAME_API = require('./gameRoutes')

let allAPIs = [].concat(USER_API, GAME_API);

module.exports = allAPIs;
