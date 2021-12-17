import {useContext, useEffect, useState} from 'react'

import {authContext, setHeaderContext} from '../../context/context'

import styles from './mailingLists.module.css'
import {messagesAPI} from "../../api/api";
import {Preloader} from "../Preloader";

export const MailingLists = () => {

	const [mailings, setMailings] = useState('All')
	const [mailingLists, setMailingLists] = useState([])
	const [isFetching, setIsFetching] = useState(false)
	const setHeaderTitle = useContext(setHeaderContext)
	const {user} = useContext(authContext)
	setHeaderTitle('Mailing lists')

	useEffect(() => {
		setIsFetching(true)
				messagesAPI.getAllMailing()
					.then(data => setMailingLists(data))
					.finally(() => setIsFetching(false))

	}, [])

	const allMailing = ()=>{
		setIsFetching(true)
		messagesAPI.getAllMailing()
			.then(data => setMailingLists(data))
			.finally(() => setIsFetching(false))
	}

	const myMailing = ()=>{
		setIsFetching(true)
		messagesAPI.getMyMailing(user.email)
			.then(data => setMailingLists(data))
			.finally(() => setIsFetching(false))
	}

	return (
		<div>
			<div className={styles.menu}>
				<span onClick={allMailing}>All mailings</span>
				<span>|</span>
				<span onClick={myMailing}>My mailings</span>
			</div>
			{isFetching
				?
				<Preloader/>
				:
				mailingLists.map(item => {
					return (
						<div className={styles.mailingList}>
						<span>

						</span>
							<span className={styles.title}>
							<span>
								Title:
							</span>
							<span>
								{item.titleMessageValue}
							</span>
						</span>
							<span className={styles.from}>
							<span>
								From:
							</span>
							<span>
								{item.email}
							</span>
						</span>
						</div>
					)
				})}
		</div>
	)
}