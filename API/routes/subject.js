const express = require('express')
const DynamoDb = require('../configurations/config')

const router = express.Router()
const Table = "subject-qch5jle2rbgglewdu32w2x3o5m-devenv"

//GET all Subjects
router.get('/' ,(req,res) => {

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
//GET subject With id
router.get('/:id', (req, res) => {
    const params = {
        TableName: Table,
        Key: {
            id: req.params.id
        }
    }

    DynamoDb.get(params, function (err, data) {
        if (err) {
            console.error(
                "Unable to read item. Error JSON:",
                JSON.stringify(err, null, 2)
            );
        } else {
            // console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
            const result = data.Item;
            if (result != null) {
                res.status(200).send(result)
            } else {
                res.status(404).send("Not Found with id: " + params.Key.id)
            }
            res.end()
        }
    })
})

//Query GET subjects with Course id
router.get('/course/:course_id', (req,res) => {
    const params = {
        TableName: Table,
        FilterExpression: '#c = :c_id',
            ExpressionAttributeNames: {
                '#c': 'course_id',
            },
            ExpressionAttributeValues: {
                ':c_id': req.params.course_id,
            },
    }

    DynamoDb.scan(params, function (err, data) {
        if (err) {
            console.error(JSON.stringify(err))
            res.status(500)
        } else {
            // console.log(JSON.stringify(data))
            res.status(200).send(data.Items)
        }
    })
})

module.exports = router