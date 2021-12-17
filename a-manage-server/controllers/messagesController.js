const {Users, MailingLists, db} = require('../configFirebase')
const nodemailer = require('nodemailer')

const uploadDraft = async (req, res) => {
	try {
		const email = req.query.user
		const dataFromDB = await Users.doc(email).get()
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
		await Users.doc(data.email).set(data)
		res.status(200).json({responseCode: 0, status: 'Saved'})
		return
	} catch (e) {
		res.status(400).json(e)
	}
}

const sendMessage = async (req, res) => {
	try {
		const data = req.body
		const emails = data.mailTo.map(item => item.email)
		const email = data.email
		const textMessage = data.textMessage
		const titleMessage = data.titleMessageValue
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'qwe371509@gmail.com',
				pass: 'qwezxc112',
			},
		})
		await transporter.sendMail({
			from: `${email} <qwe371509@gmail.com>`,
			to: emails,
			subject: titleMessage,
			text: textMessage,
		}, async (err, result) => {
			if (!err) {
				const user = db.doc(`Users/${email}`)
				await MailingLists.doc(Date.now().toString()).set({...data, link: user})
			}
		});

		res.status(200).json({responseCode: 0, message: 'Sent'})
		return
	} catch (e) {

		res.status(400).json(e)
		return
	}
}

const getAllMailing = async (req, res) => {
	try {
		let mailingArray = []
		const dataFromDB = await MailingLists.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					mailingArray.push(doc.data())
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		res.status(200).json(mailingArray)
		return
	} catch (e) {
		res.status(400).json(e)
		return
	}
}

const getMyMailing = async (req, res) => {
	try {
		const email = req.query.email
		let mailingArray = []
		await MailingLists.where('email', '==', email)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					mailingArray.push(doc.data())
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		res.status(200).json(mailingArray)
		return
	} catch (e) {
		res.status(400).json(e)
		return
	}
}

module.exports = {
	saveDraft,
	uploadDraft,
	sendMessage,
	getAllMailing,
	getMyMailing
}