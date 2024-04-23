const MongoStore = require('connect-mongo')
const session = require('express-session')
const defaultOptions = require('./defaultOptions')

const { dbName, URI } = require('../config/dbConfig')

const storage = MongoStore.create({
    dbName,
    mongoUrl:URI,
    ttl: 60
    
})

module.exports = session({
    store: storage,
    ...defaultOptions
})