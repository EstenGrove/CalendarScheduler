import React from "react";
import styles from "../../css/ui/ColorsPicker.module.scss";

type Props = {
	onSelect?: (color: string) => void;
};

const colors = [
	"var(--accent)",
	"var(--accent-purple)",
	"var(--accent-blue)",
	"var(--accent-red)",
	"var(--accent-green)",
	"var(--blueGrey700)",
];

type OptProps = {
	color: string;
	onClick?: () => void;
};

const ColorOption = ({ color, onClick }: OptProps) => {
	const css = { backgroundColor: color };
	return (
		<div onClick={onClick} className={styles.ColorOption} style={css}></div>
	);
};

const ColorsPicker = ({ onSelect }: Props) => {
	const handleSelect = (color: string) => {
		if (onSelect) {
			return onSelect(color);
		}
	};

	return (
		<div className={styles.ColorsPicker}>
			<div className={styles.ColorsPicker_options}>
				{colors &&
					colors.map((color, idx) => (
						<ColorOption
							key={color + idx}
							color={color}
							onClick={() => handleSelect(color)}
						/>
					))}
			</div>
		</div>
	);
};

export default ColorsPicker;
