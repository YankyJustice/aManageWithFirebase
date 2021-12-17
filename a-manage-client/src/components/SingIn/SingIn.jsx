import {useForm} from 'react-hook-form';
import {signInWithEmailAndPassword} from 'firebase/auth';
import cn from 'classnames'
import {useContext, useState} from 'react';

import {authContext} from '../../context/context';

import styles from './singIn.module.css'

export const SingIn = () => {

	const [errorMessage, setErrorMessage] = useState()

	const {register, handleSubmit, watch, formState: {errors}} = useForm();
	const {auth} = useContext(authContext)

	const onSubmit = data => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				console.log(userCredential)
			})
			.catch((error) => {
				console.log(error)
			});
	}

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					className={cn({[styles.error]: errors.email})}
					placeholder='Email'
					{...register('email', {required: true})} />
				<input
					type='password'
					className={cn({[styles.error]: errors.password})}
					placeholder='Password'
					{...register('password', {required: true})} />
				<button type='submit'>Sign in</button>
			</form>
			{errorMessage}
		</div>
	)
}