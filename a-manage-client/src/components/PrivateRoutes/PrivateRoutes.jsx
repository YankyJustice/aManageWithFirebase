import {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Private} from '../../routes/routes';
import {Sidebar} from '../Sidebar';
import {setHeaderContext} from '../../context/context';

import styles from './privateRoutes.module.css'

const PrivateRoutes = () => {
	const [headerTitle, setHeaderTitle] = useState()

	return (
		<div className={styles.container}>
			<Sidebar/>
			<div>
				<header className={styles.header}>
					<div className={styles.title}>
						{headerTitle}
					</div>
					<div>
					</div>
				</header>
				<setHeaderContext.Provider value={setHeaderTitle}>
					<Switch>
						{Private.map((item) => {
							return (<Route
								path={item.path}
								component={item.component}
								key={item.index}
								exact={item.exact}
							/>)
						})
						}
						<Redirect from='/' to='/newMailing'/>
					</Switch>
				</setHeaderContext.Provider>
			</div>
		</div>
	)
}

export {PrivateRoutes}