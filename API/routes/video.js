const express = require('express')
const DynamoDb = require('../configurations/config')

const router = express.Router()
const Table = "video-qch5jle2rbgglewdu32w2x3o5m-devenv"

//GET all vidoes
router.get('/', (req,res) => {
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

//Query GET videos with Subject id
router.get('/subject/:subject_id', (req, res) => {
    const params = {
        TableName: Table,
        FilterExpression: '#s = :s_id',
        ExpressionAttributeNames: {
            '#s': 'subject_id',
        },
        ExpressionAttributeValues: {
            ':s_id': req.params.subject_id,
        },
    }

    DynamoDb.scan(params, function (err, data) {
        if (err) {
            console.error(JSON.stringify(err));
            res.status(500)
        } else {
            console.log(JSON.stringify(data));
            res.status(200).send(data.Items)
        }
    });
})

module.exports = router