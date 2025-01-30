import styles from "../css/pages/PageNotFound.module.scss";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.PageNotFound}>
			<h1 className={styles.PageNotFound}>Page Not Found</h1>
			<Button onClick={goBack}>👈 Back</Button>
		</div>
	);
};

export default PageNotFound;
