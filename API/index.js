const express = require('express')
const user = require('./routes/user')
const course = require('./routes/courseCategory')
const subject = require('./routes/subject')
const video = require('./routes/video')
const post = require('./routes/post')
const admin = require('./routes/admin')
const cors = require('cors')

const app = express()
const PORT = 3030

app.use(express.json())
app.use(cors())

app.use('/user',user)
app.use('/course',course)
app.use('/subject',subject)
app.use('/video',video)
app.use('/post',post)
app.use('/admin',admin)

app.listen(PORT,() => {console.log("DEV:API server started at: http://localhost:" + PORT)})