import {applyActionCode, sendEmailVerification} from 'firebase/auth';
import {useQueryParam, StringParam} from 'use-query-params';
import {useHistory} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';

import {authContext} from '../../context/context';

import styles from './verifyEmail.module.css'

export const VerifyEmail = () => {

	const [Success, setSuccess] = useState(false)
	const [counter, setCounter] = useState(6)

	const [actionCode, setActionCode] = useQueryParam('oobCode', StringParam);
	const history = useHistory()
	const {auth, user} = useContext(authContext)

	const sendLink = () => {

		sendEmailVerification(user, null)
			.then(() => {
			})
			.catch((error) => {
			});
	}


	useEffect(() => {
		if (counter !== 6) {
			if (counter > 0) {
				setTimeout(() => setCounter(counter - 1), 1000)
			} else {
				history.push('/newMailing')
				history.go(0)
			}
		}
	}, [counter])

	useEffect(() => {
		if (actionCode) {
			applyActionCode(auth, actionCode.toString())
				.then(() => {
					setSuccess(true)
					setCounter(counter - 1)
				})
				.catch(e => console.log(e))
		}
	}, [])


	return (
		<div className={styles.header}>
			{Success
				?
				<div>
					<span>Email verified</span>
					<span>you will be redirected through</span>
					<span>{counter}</span>
				</div>
				:
				<div>
					<span>Please verify your email</span>
					<span>resend the link</span>
					<button onClick={sendLink}>Send</button>
				</div>
			}
		</div>
	)
}