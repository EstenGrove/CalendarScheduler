import { useRef, useState } from "react";

type TProps = {
	onSuccess: (data: GeolocationPosition) => void;
	onWatch: (data: GeolocationPosition) => void;
	onError?: (error: GeolocationPositionError) => void;
};

const useGeoTracker = ({ onSuccess, onError, onWatch }: TProps) => {
	const [geoData, setGeoData] = useState<Geolocation | object>({});
	const watchID = useRef<number>();

	const getCurrentPosition = () => {
		if ("navigator" in window) {
			window.navigator.geolocation.getCurrentPosition((result) => {
				setGeoData(result);
				if (onSuccess) return onSuccess(result as GeolocationPosition);
			}, onError);
		}
	};

	const startWatchingPosition = () => {
		watchID.current = window.navigator.geolocation.watchPosition(
			onWatch,
			onError
		);
	};

	const stopWatchingPosition = () => {
		navigator.geolocation.clearWatch(watchID.current as number);
	};

	return {
		geoData,
		setGeoData,
		getCurrentPosition,
		startWatchingPosition,
		stopWatchingPosition,
	};
};

export { useGeoTracker };
