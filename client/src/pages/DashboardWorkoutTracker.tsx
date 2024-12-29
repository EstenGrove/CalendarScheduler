import { useEffect, useState } from "react";
import styles from "../css/pages/DashboardWorkoutTracker.module.scss";
import { useGeoTracker } from "../hooks/useGeoTracker";
import PageHeader from "../components/layout/PageHeader";

// REQUIREMENTS:
// - Used for geolocation tracking for timed walks/runs & distance walks/runs

const DashboardWorkoutTracker = () => {
	const [geoData, setGeoData] = useState<GeolocationPosition[]>([]);
	const tracker = useGeoTracker({
		onSuccess(data) {
			console.log("[SUCCESS]", data);
			setGeoData([...geoData, data]);
		},
		onError(error) {
			console.log("[ERROR]", error);
		},
		onWatch(data) {
			console.log("[WATCH]:", data);
		},
	});

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		tracker.startWatchingPosition();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log("tracker", tracker);
	return (
		<div className={styles.DashboardWorkoutTracker}>
			<PageHeader title="Tracker" />
			<div className={styles.DashboardWorkoutTracker_inner}>
				{JSON.stringify(geoData, null, 4)}
				{geoData &&
					geoData?.length &&
					geoData.map((data, idx) => (
						<ul key={idx} style={{ margin: "2rem 0" }}>
							<li>Latitude: {data.coords.latitude}°</li>
							<li>Longitude: {data.coords.longitude}°</li>
						</ul>
					))}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardWorkoutTracker;
