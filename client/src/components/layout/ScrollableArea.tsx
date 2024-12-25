import { CSSProperties, ReactNode } from "react";
import styles from "../../css/layout/ScrollableArea.module.scss";

type Props = {
	width?: string | number;
	height?: string | number;
	direction: ScrollDirection;
	snapType: "mandatory" | "proximity" | "none";
	children?: ReactNode;
};

type ScrollDirection = "horizontal" | "vertical" | "both" | "none";
type SnapType = "mandatory" | "proximity" | "none";
interface ScrollOpts {
	direction: ScrollDirection;
	snapType: SnapType;
}

const getScrollStyles = (options: ScrollOpts): CSSProperties => {
	const { direction, snapType } = options;

	if (direction === "horizontal") {
		// Horizontal
		return {
			overflowX: "auto",
			scrollSnapType: snapType !== "none" ? `x ${snapType}` : "none",
			overscrollBehaviorX: "contain",
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			gap: "0 1rem",
		};
	} else if (direction === "vertical") {
		// Vertical
		return {
			overflowY: "scroll",
			scrollSnapType: snapType !== "none" ? `y ${snapType}` : "none",
			overscrollBehaviorY: "contain",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			gap: "1rem 0",
		};
	} else if (direction === "both") {
		// Both
		return {
			overflowY: "scroll",
			overflowX: "scroll",
			scrollSnapType: snapType !== "none" ? `xy ${snapType}` : "none",
		};
	} else {
		// None
		return {};
	}
};

const ScrollableArea = ({
	direction = "none",
	snapType = "none",
	width = "100%",
	height = "100%",
	children,
}: Props) => {
	const scrollCss = getScrollStyles({ direction, snapType });
	return (
		<div className={styles.ScrollableArea} width={width}>
			<div className={styles.ScrollableArea_inner} style={scrollCss}>
				{children}
			</div>
		</div>
	);
};

export default ScrollableArea;
