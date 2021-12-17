const Router = require('express')
const {
	saveDraft,
	uploadDraft,
	sendMessage,
	getAllMailing,
	getMyMailing
} = require('../controllers/messagesController')

const messagesRouter = Router()
module.exports = messagesRouter


messagesRouter.post('/saveDraft', saveDraft)
messagesRouter.get('/uploadDraft', uploadDraft)
messagesRouter.post('/send', sendMessage)
messagesRouter.get('/allMailing', getAllMailing)
messagesRouter.get('/myMailing', getMyMailing)