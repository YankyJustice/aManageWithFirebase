const fs = require('fs')
const csvParse = require('csv-parser')
const {Users} = require('../configFirebase')

const uploadDraft = async (req, res) => {
	try {
		const email = req.query.user
		console.log(email)
		const dataFromDB = await Users.doc(email).get()
		console.log(dataFromDB)
		res.status(200).json(dataFromDB.data())
		return
	} catch (e) {
		res.status(400).json(e)
		return
	}
}

const saveDraft = async (req, res) => {
	try {
		const data = req.body
		console.log(data)
		await Users.doc(data.email).set(data)
		res.status(200).json({responseCode: 0, status: 'Saved'})
		return
	} catch (e) {
		res.status(400).json(e)
	}
}

module.exports = {saveDraft, uploadDraft}