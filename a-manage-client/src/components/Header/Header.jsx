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
					<span>Sing in</span>
				</NavLink>
				<span>|</span>
				<NavLink to='/singUp'>
					<span>Sing up</span>
				</NavLink>
			</div>
		</header>
	)
}
