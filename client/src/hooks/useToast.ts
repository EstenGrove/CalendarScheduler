import { useState, useEffect, useCallback, useRef } from "react";

export interface UseToastProps {
	timeToShow?: number;
	onShow?: () => void;
	onClose?: () => void;
}

export interface UseToastReturn {
	isShowing: boolean;
	showToast: () => void;
	closeToast: () => void;
}

const defaultProps = {
	show: false,
	timeToShow: 3000,
	onShow: () => {},
	onClose: () => {},
};

const useToast = ({
	onClose = defaultProps.onClose,
	onShow = defaultProps.onShow,
	timeToShow = 3000,
}: UseToastProps = defaultProps) => {
	const timerID = useRef<ReturnType<typeof setTimeout>>();
	const [isShowing, setIsShowing] = useState<boolean>(false);

	const showToast = () => {
		setIsShowing(true);

		// reset any existing timers first
		// NOTE: we do this in case a toast is already showing still, we need to clear it out
		if (timerID.current) {
			const id = timerID.current as ReturnType<typeof setTimeout>;
			clearTimeout(id);
		}

		return onShow && onShow();
	};

	const closeToast = useCallback(() => {
		setIsShowing(false);

		if (timerID.current) {
			const id = timerID.current as ReturnType<typeof setTimeout>;
			clearTimeout(id);
		}
		return onClose && onClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// reset & clear current timeoutID
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isShowing) {
			timerID.current = setTimeout(() => {
				closeToast();
			}, timeToShow);
		}

		return () => {
			isMounted = false;
			clearTimeout(timerID.current);
		};
	}, [closeToast, isShowing, timeToShow]);

	return {
		isShowing,
		showToast,
		closeToast,
	};
};

export { useToast };
