const express = require("express")
const DynamoDb = require("../configurations/config")
const UUIDv4 = require("uuid/v4")

const DEFAULT_IMAGE_URL = "https://acadboost-courses-videos.s3.ap-south-1.amazonaws.com/ProfilePicture/Default/defaultProfilePicture.png"
const router = express.Router()
const Table = "User-qch5jle2rbgglewdu32w2x3o5m-devenv"

//GET users
router.get("/", (req, res) => {
  const params = {
    TableName: Table
  }

  DynamoDb.scan(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      // console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
      res.send(data.Items)
      res.end()
    }
  });
});

//GET user by id
router.get("/:id", (req, res) => {
  const params = {
    TableName: Table,
    Key: {
      id: req.params.id
    }
  }

  DynamoDb.get(params, function(err, data) {
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

//POST new user  
router.post("/add", (req, res) => {
  const id = UUIDv4()

  const params = {
    TableName: Table,
    Item: {
      __typename: "User",
      id: id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      sign_up_type: req.body.sign_up_type,
      profile_picture_url: DEFAULT_IMAGE_URL
    }
  }

  DynamoDb.put(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      )
      res.status(400).send(err)
    } else {
    //   console.log("Added item:", JSON.stringify(data, null, 2))
      res.status(200).send(params.Item)
    }
    res.end()
  })
})

//UPDATE existing user with id
router.put('/update/:id', (req,res) => {
    const id = req.params.id
    
    const serachParms = {
      TableName: Table,
      Key: {
        id: id
      }
    }

    DynamoDb.get(serachParms, (err, data) => {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        // console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
        if (data.Item != null) {
        //   console.log("Found")
          update(req, res)
        } else {
        //   console.log("Not Found")
          res.status(404).send("Not Found")
        }
      }
      res.end()
    })
})

update = (req,res) => {
    
    const params = {
      TableName: Table,
      Key: {
        id: req.params.id
      },
      UpdateExpression: "set email = :e, password = :p, #user_name = :n, profile_picture_url = :pUrl",
      ExpressionAttributeNames: {
          "#user_name": "name"
      },
      ExpressionAttributeValues: {
        ":e": req.body.email,
        ":p": req.body.password,
        ":n": req.body.name,
        ":pUrl": req.body.profile_picture_url
      },
      ReturnValues: "UPDATED_NEW"
    }

    DynamoDb.update(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to update item. Error JSON:",
          JSON.stringify(err, null, 2)
        )
        res.status(400).send("Unable to Update")
      } else {
        // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2))
        res.status(200).send(data)
      }
      res.end()
    })
}

router.delete("/delete/:id", (req, res) => {
  const params = {
    TableName: Table,
    Key: {
      id: req.params.id
    }
  }

  DynamoDb.delete(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      )
      res.status(500).send("Error while deleting")
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2))
      res.status(200).send("deleted successfully")
    }
    res.end()
  })
})

//GET user by Email and Password
router.get('/authenticate/:email/:password', (req,res) => {
  const params = {
    TableName: Table,
    FilterExpression: '#e = :e and #p = :p',
    ExpressionAttributeNames: {
      '#e': 'email',
      '#p': 'password'
    },
    ExpressionAttributeValues: {
      ':e': req.params.email,
      ':p': req.params.password
    },
  }

  DynamoDb.scan(params, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      res.status(500)
    } else {
      // console.log(JSON.stringify(data))
      if(parseInt(data.Count) === 0) {
        // console.log('Not Found')
        res.send('0')
      }else{
        // console.log('Found')
        res.status(200).send(data.Items)
      }
    }
  })

})

module.exports = router
