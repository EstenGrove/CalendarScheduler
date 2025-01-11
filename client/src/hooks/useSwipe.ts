import { TouchEvent, RefObject } from "react";

const startX = 0;
const moveX = 0;
const endX = 0;

export interface HookArgs {
	onSwipe?: (e: TouchEvent) => void;
	onSwipeLeft?: (e: TouchEvent) => void;
	onSwipeRight?: (e: TouchEvent) => void;
	onSwipeUp?: (e: TouchEvent) => void;
	onSwipeDown?: (e: TouchEvent) => void;
}

const defaultOpts = {
	onSwipe: () => {},
	onSwipeLeft: () => {},
	onSwipeRight: () => {},
	onSwipeUp: () => {},
	onSwipeDown: () => {},
};

const useSwipe = (
	elementRef: RefObject<HTMLElement>,
	options: HookArgs = defaultOpts
) => {
	const { onSwipe, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } =
		options;

	return {};
};
