import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div className={styles.Logo}>
			<Link to="/">
				<h2>shop de mo</h2>
			</Link>
		</div>
	);
};

export default Logo;
