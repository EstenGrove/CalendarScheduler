// Determines direction of 'swipe' gesture
const isSwipeRight = (start: number, end: number) => {
	return end > start;
};
// Determines direction of 'swipe' gesture
// - NOTE: a threshold should be define elsewhere, this just determines directionality
const isSwipeLeft = (start: number, end: number) => {
	return end < start;
};

export { isSwipeRight, isSwipeLeft };
