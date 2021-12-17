import loading from '../../assets/images/loading.gif'
import styles from './preloader.module.css'

export const Preloader = ()=>{
	return(
		<div className={styles.container}>
			<img src={loading}/>
		</div>
	)
}