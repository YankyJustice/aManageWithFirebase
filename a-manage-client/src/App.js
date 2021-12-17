import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth'

import {authContext} from './context/context';
import {PrivateRoutes} from './components/PrivateRoutes';
import {PublicRoutes} from './components/PublicRoutes';
import {VerifyEmail} from './components/VerifyEmail';

import styles from './App.module.css';
import {Preloader} from "./components/Preloader";

const firebaseConfig = {
	apiKey: 'AIzaSyBKuPzYG_b70_8UQfcnH12h_c4HFHYre18',
	authDomain: 'a-manage.firebaseapp.com',
	projectId: 'a-manage',
	storageBucket: 'a-manage.appspot.com',
	messagingSenderId: '483905884774',
	appId: '1:483905884774:web:31341c50ac2f9b469513a7',
	measurementId: 'G-FF2980NVPP'
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();


function App() {

	const [user, loading, error] = useAuthState(auth)

	if (loading) {
		return (
			<div className={styles.preloader}>
				<Preloader/>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<authContext.Provider value={{auth, user}}>
				{user ? user.emailVerified ? <PrivateRoutes/> : <VerifyEmail/> : <PublicRoutes/>}
			</authContext.Provider>
		</div>
	);
}

export default App;
