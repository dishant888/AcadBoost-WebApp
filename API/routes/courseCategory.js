const express = require('express')
const DynamoDb = require('../configurations/config')

const router = express.Router()
const Table = 'courseCategory-qch5jle2rbgglewdu32w2x3o5m-devenv'

router.get('/', (req, res) => {
    const params = {
        TableName: Table
    }

    DynamoDb.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
            res.status(500)
        } else {
            // console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
            res.status(200).send(data.Items)
        }
    })
})

module.exports = router