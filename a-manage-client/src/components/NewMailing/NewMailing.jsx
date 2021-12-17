import {useContext, useRef, useState} from 'react';
import CSVReader from 'react-csv-reader';

import {messagesAPI} from '../../api/api';
import {authContext, setHeaderContext} from '../../context/context';

import styles from './newMailing.module.css'
import {Preloader} from "../Preloader";

export const NewMailing = () => {
	const [mailTo, setMailTo] = useState([])
	const [textareaValue, setTextareaValue] = useState('')
	const [tooltip, setTooltip] = useState(false)
	const [emailsForTooltip, setEmailsForTooltip] = useState(mailTo)
	const [findWord, setFindWord] = useState('')
	const [findMode, setFindMode] = useState(false)
	const [indexTrigger, setIndexTrigger] = useState()
	const [titleMessageValue, setTitleMessageValue] = useState()
	const [isFetching, setIsFetching] = useState(false)

	const inputCsv = useRef()
	const setHeaderTitle = useContext(setHeaderContext)
	setHeaderTitle('New mailing')

	const {user} = useContext(authContext)

	const handleChangeTextarea = (e) => {
		if (indexTrigger && e.nativeEvent.data === ' ') {
			setIndexTrigger(null)
			setFindMode(false)
			setTooltip(false)
		}

		if (textareaValue.length === indexTrigger + 1 && e.nativeEvent.inputType === 'deleteContentBackward') {
			setIndexTrigger(null)
			setFindMode(false)
			setTooltip(false)
		}

		if (e.nativeEvent.data === '#') {
			if (!indexTrigger) {
				setIndexTrigger(textareaValue.length)
			}
			setTooltip(true)
			setFindMode(true)
		}

		if (findMode) {
			setFindWord(textareaValue.slice(indexTrigger + 1, textareaValue.length))
			setEmailsForTooltip(mailTo.filter(el => el.email?.toLowerCase().search(findWord) !== -1))
		}
		setTextareaValue(e.target.value)
	}

	const saveDraft = (e) => {
		setIsFetching(true)
		e.preventDefault()
		messagesAPI.saveDraft({mailTo, titleMessageValue, email: user.email, textareaValue})
			.finally(()=>setIsFetching(false))
	}

	const uploadDraft = (e) => {
		setIsFetching(true)
		e.preventDefault()
		messagesAPI.uploadDraft(user.email)
			.then(data => {
				console.log(inputCsv)
				data.textareaValue && setTextareaValue(data.textareaValue)
				data.titleMessageValue && setTitleMessageValue(data.titleMessageValue)
				setEmailsForTooltip([])
				data.mailTo && setMailTo(data.mailTo)
			})
			.finally(()=>setIsFetching(false))

	}

	const chooseUserFromList = (email) => {
		setTextareaValue(textareaValue.slice(0, indexTrigger + 1) + email)
		setTooltip(false)
		setFindWord('')
		setFindMode(false)
	}
	console.log(isFetching)
	const sendMessage = (e) => {
		setIsFetching(true)
		e.preventDefault()
		messagesAPI.sendMessage({mailTo, textMessage: textareaValue, email:user.email, titleMessageValue})
			.then(()=>{
				setTextareaValue('')
				setTitleMessageValue('')
				setEmailsForTooltip([])
				setMailTo([])
			})
			.finally(()=>setIsFetching(false))
	}

	const handleForce = (data) => setMailTo(data);

	const papaparseOptions = {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
	};


	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={styles.uploadCSV}>
					<CSVReader
						label='Upload file csv: '
						onFileLoaded={handleForce}
						parserOptions={papaparseOptions}
					/>
				</div>
				<div className={styles.mailFrom}>
					<span>From: </span>
					<span>{user.email}</span>
				</div>
				<div className={styles.mailTo}>
					<span>To: </span>
					{mailTo.map(item => {
						return (
							<span>
							{item.email},
							</span>
						)
					})}
				</div>
				<div className={styles.titleMessage}>
					<input
						placeholder='Title'
						type='text'
						onChange={(e) => setTitleMessageValue(e.target.value)}
						value={titleMessageValue}/>
				</div>
				<textarea value={textareaValue} onChange={(e) => handleChangeTextarea(e)}/>
				<div className={styles.emails}>
					{tooltip && emailsForTooltip ? emailsForTooltip.map(item => {
						return (
							<span key={item.email} onClick={() => chooseUserFromList(item.email)}>
							{item.email}
						</span>
						)
					}) : ''}
				</div>
				<div className={styles.buttons}>
					<div className={styles.draft}>
						<button onClick={(e) => uploadDraft(e)}>Upload draft</button>
						<button onClick={(e) => saveDraft(e)}>Save draft</button>
					</div>
					<div>
						<button onClick={(e) => sendMessage(e)}>Send message</button>
					</div>
				</div>
				{isFetching && <Preloader/>}
			</form>

		</div>
	)
}