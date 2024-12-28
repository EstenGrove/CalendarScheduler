import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../../css/ui/ProgressCircle.module.scss";

type Props = {
	percentage: number;
	size?: number;
	color?: string;
	trackColor?: string;
	showText?: boolean;
};

const range = {
	min: 0,
	max: 565,
};

const getProgressFromPercent = (percent: number) => {
	const rangeMax = range.max; // The value corresponding to 0%
	const progress = rangeMax - percent * (rangeMax / 100);
	return progress;
};

const initial = 565.48;

const ProgressCircle = ({
	percentage = 0,
	size = 200,
	color = "var(--accent)",
	trackColor = "var(--blueGrey800)",
	showText = true,
}: Props) => {
	const circleRef = useRef<SVGCircleElement>(null);
	const [offset, setOffset] = useState(initial);

	const updateOffset = useCallback((value: number) => {
		const newOffset = getProgressFromPercent(value);
		setOffset(newOffset);
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		updateOffset(percentage);

		return () => {
			isMounted = false;
		};
	}, [percentage, updateOffset]);

	return (
		<div className={styles.ProgressCircle}>
			<svg
				width={size}
				height={size}
				viewBox="-25 -25 250 250"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				style={{ transform: "rotate(-90deg)" }}
			>
				<defs>
					<linearGradient id="progress" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#4caf50" />
						<stop offset="100%" stopColor="#1e88e5" />
					</linearGradient>
				</defs>

				<circle
					id="track"
					r="90"
					cx="100"
					cy="100"
					fill="transparent"
					stroke={trackColor}
					strokeWidth="16px"
					className={styles.ProgressCircle_track}
				></circle>
				<circle
					ref={circleRef}
					id="progress"
					r="90"
					cx="100"
					cy="100"
					stroke={color}
					strokeWidth="16px"
					strokeLinecap="round"
					fill="transparent"
					strokeDasharray="565.48px"
					className={styles.ProgressCircle_progress}
					style={{
						strokeDashoffset: offset + "px",
						transition: "stroke-dashoffset 0.5s ease-in-out",
					}}
				></circle>

				{showText && (
					<text
						x="72px"
						y="115px"
						fill={color}
						fontWeight="bold"
						style={{
							transform: "rotate(90deg) translate(30px, -196px)",
						}}
						textAnchor="middle"
						className={styles.ProgressCircle_text}
					>
						{percentage}%
					</text>
				)}
			</svg>
		</div>
	);
};

export default ProgressCircle;
