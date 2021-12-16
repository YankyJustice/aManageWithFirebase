import {useForm} from 'react-hook-form';
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import cn from 'classnames'
import {useContext, useState} from 'react';

import {authContext} from '../../context/context';

import styles from './singUp.module.css'

const regEXPemail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SingUp = () => {

	const [successMessage, setSuccessMessage] = useState()
	const [errorMessage, setErrorMessage] = useState()

	const {register, handleSubmit, watch, formState: {errors}} = useForm();
	const {auth, user} = useContext(authContext)


	const onSubmit = data => {
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				sendEmailVerification(auth.currentUser, null)
					.then(() => {
						localStorage.setItem('emailForSignIn', data.email)
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
					});
			})
			.catch((error) => {
				console.log(error.message)
			});
	}
	const repeatPasswordValidate = (value) => value === watch('password')

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder='Email'
					className={cn({[styles.error]: errors.email})}
					{...register('email', {required: true, pattern: regEXPemail})} />
				<input
					placeholder='Password'
					className={cn({[styles.error]: errors.password})}
					type='password'
					{...register('password', {required: true, minLength: 6})} />
				<input
					placeholder='Repeat password'
					type='password'
					className={cn({[styles.error]: errors.repeatPassword})}
					{...register('repeatPassword', {required: true, validate: repeatPasswordValidate})} />
				<button type='submit'>Sing in</button>
			</form>
			<span className={styles.errorMessage}>{errorMessage}</span>
			<span className={styles.successMessage}>{successMessage}</span>
		</div>
	)
}