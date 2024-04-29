const dotenv = require('dotenv').config()
module.exports = {
    appId: process.env.APP_appId,
    clientID: process.env.CLI_clientID,
    clientSecret: process.env.CLI_SEC_clientSecret,
    callbackURL: process.env.CALL_callbackURL
}