import {useContext, useEffect, useState} from 'react'

import {setHeaderContext} from '../../context/context'

import styles from './mailingLists.module.css'

export const MailingLists = () => {


	const [mailingLists, setMailingLists] = useState([])
	const setHeaderTitle = useContext(setHeaderContext)
	setHeaderTitle('Mailing lists')


	return (
		<div>
			{mailingLists?.map(item => {
				return (
					<div className={styles.mailingList}>
						<span>

						</span>
						<span className={styles.title}>
							<span>
								Title:
							</span>
							<span>
								{item.titleMessage}
							</span>
						</span>
						<span className={styles.from}>
							<span>
								From:
							</span>
							<span>
								{item.from}
							</span>
						</span>
					</div>
				)
			})}
		</div>
	)
}