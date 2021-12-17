import {NavLink} from 'react-router-dom';

import styles from './header.module.css'
import manage from '../../assets/images/manage.png';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.icon}>
				<img src={manage}/>
				<span>manage</span>
			</div>
			<div className={styles.loginPanel}>
				<NavLink to='/singIn'>
					<span>Sign in</span>
				</NavLink>
				<span>|</span>
				<NavLink to='/singUp'>
					<span>Sign up</span>
				</NavLink>
			</div>
		</header>
	)
}
