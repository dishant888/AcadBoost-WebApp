const express = require('express')
const DynamoDb = require('../configurations/config')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Post')
    res.end()
})

module.exports = router