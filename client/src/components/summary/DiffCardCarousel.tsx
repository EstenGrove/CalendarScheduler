import React from "react";
import styles from "../../css/summary/DiffCardCarousel.module.scss";

type Props = {};

// REQUIREMENTS:
// - Shows week totals as initial page
// - Then each page change steps thru each day of the week's cards until we're back at the start

const DiffCardCarousel = ({}: Props) => {
	return (
		<div className={styles.DiffCardCarousel}>
			<div className={styles.DiffCardCarousel_main}>
				{/* ITEMS */}
				{/* ITEMS */}
			</div>
			<div className={styles.DiffCardCarousel_nav}>
				{/* NAV BUTTONS */}
				{/* NAV BUTTONS */}
			</div>
		</div>
	);
};

export default DiffCardCarousel;
