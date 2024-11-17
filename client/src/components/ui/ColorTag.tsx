import { ComponentPropsWithoutRef } from "react";
import styles from "../../css/ui/ColorTag.module.scss";

type TagProps = {
	color: string;
	tagName?: string;
};

// @ts-expect-error: this is fine
interface Props extends TagProps, ComponentPropsWithoutRef<"div"> {}

const ColorTag = ({ color, tagName, ...rest }: Props) => {
	const css = { backgroundColor: color };
	return (
		<div
			title={tagName || "Tag"}
			className={styles.ColorTag}
			style={css}
			{...rest}
		></div>
	);
};

export default ColorTag;
