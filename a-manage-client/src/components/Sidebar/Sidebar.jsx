import {NavLink} from 'react-router-dom';
import {useContext, useState} from 'react';
import {signOut} from 'firebase/auth';

import {authContext} from '../../context/context';

import styles from './sidebar.module.css'
import icon from '../../assets/images/manage.png'

export const Sidebar = () => {

	const {auth} = useContext(authContext)

	const logout = () => {
		signOut(auth)
			.then(() => {
				console.log(1)
			})
			.catch(() => {
			});
	}
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.icon}>
					<img src={icon}/>
					<span>manage</span>
				</div>
				<div className={styles.menu}>
					<NavLink to='/newMailing'>New mailing</NavLink>
					<NavLink to='/mailingLists'>Mailing lists</NavLink>
				</div>
			</div>
			<div className={styles.logout}>
				<span onClick={logout}>Log out</span>
			</div>
		</div>
	)
}