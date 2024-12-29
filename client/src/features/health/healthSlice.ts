import { createSlice } from "@reduxjs/toolkit";

export interface HealthProfile {
	firstName: string;
	lastName: string;
	age: number;
	weight: number;
	height: number; // ft (decimals) (eg. 5.9 ft.)
	strideLength: number; // steps x strideLength(in feet) = distance(in feet)/ 5280(feet per mile)
	bodyMassIndex: number;
	avgDailyCalories: number;
}

export interface HealthProfileChanges {
	dailyCalories: number[];
	dailyWeightChanges: number[];
}

export interface HealthSlice {
	profile: HealthProfile | null;
	profileChanges: HealthProfileChanges | null;
}

const initialState: HealthSlice = {
	profile: null,
	profileChanges: null,
};

const healthSlice = createSlice({
	name: "health",
	initialState: initialState,
	reducers: {},
});

export default healthSlice.reducer;
