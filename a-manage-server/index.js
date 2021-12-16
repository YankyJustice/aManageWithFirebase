const express = require('express')
const cors = require('cors')
const app = express()
const messagesRouter = require ('./routes/messagesRouter')
const fileUpload = require('express-fileupload')


app.use(cors({origin: '*'}))
app.use(express.json())
app.use(fileUpload({
	useTempFiles : true,
	tempFileDir : '/tmp/'
}));
app.use('/messages', messagesRouter)

const start = async () => {
	app.listen(4000, () => console.log(4000))
}

start()