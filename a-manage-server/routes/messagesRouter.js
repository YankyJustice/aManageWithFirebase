const Router = require('express')
const {saveDraft, uploadDraft} = require('../controllers/messagesController')

const messagesRouter = Router()
module.exports = messagesRouter


messagesRouter.post('/saveDraft', saveDraft)
messagesRouter.get('/uploadDraft', uploadDraft)