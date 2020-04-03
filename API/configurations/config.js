const AWS = require('aws-sdk')

const awsConfig = {
  region: "ap-south-1",
  endpoint: "http://dynamodb.ap-south-1.amazonaws.com/",
  accessKeyId: "AKIA6QO4D6HKWV7EDQ3F",
  secretAccessKey: "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"
}

AWS.config.update(awsConfig)

module.exports = new AWS.DynamoDB.DocumentClient()