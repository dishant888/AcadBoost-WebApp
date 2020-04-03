const express = require("express")
const DynamoDb = require("../configurations/config")

const router = express.Router()
const Table = "admin"

//GET admin with username and password
router.get('/authenticate/:username/:password', (req, res) => {
    const params = {
        TableName: Table,
        FilterExpression: '#u = :u and #p = :p',
        ExpressionAttributeNames: {
            '#u': 'username',
            '#p': 'password'
        },
        ExpressionAttributeValues: {
            ':u': req.params.username,
            ':p': req.params.password
        },
    }

    DynamoDb.scan(params, function (err, data) {
        if (err) {
            console.error(JSON.stringify(err))
            res.status(500)
        } else {
            // console.log(JSON.stringify(data))
            if (parseInt(data.Count) === 0) {
                // console.log('Not Found')
                res.send('0')
            } else {
                // console.log('Found')
                res.status(200).send(data.Items)
            }
        }
    })

})

module.exports = router;