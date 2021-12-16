import {Redirect, Route, Switch} from 'react-router-dom';

import {Public} from '../../routes/routes';
import {Header} from '../Header';

import styles from './publicRoutes.module.css'

export const PublicRoutes = () => {

	return (
		<div className={styles.container}>
			<Header/>
			<Switch>
				{Public.map((item) => {
					return (
						<Route
							path={item.path}
							component={item.component}
							key={item.index}
						/>)
				})}
				<Redirect from='/' to='/singIn'/>
			</Switch>
		</div>
	)
}