import type {
	CustomRange,
	RangeTotals,
	RangeTotalsClient,
} from "./SummaryService";
import type { UserWorkoutPayload } from "./UserWorkoutService";

export type WeekDayToken = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";

export type EventFrequency =
	| "Daily"
	| "Weekly"
	| "Monthly"
	| "Yearly"
	| "Custom"
	| "Never";

export type WorkoutStatus =
	| "COMPLETE"
	| "NOT-COMPLETE"
	| "IN-PROGRESS"
	| "CANCELLED"
	| "PAST-DUE";

export interface CreateEventVals {
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isRecurring: boolean;
	frequency: EventFrequency; // 'Daily', 'Weekly', 'Monthly', 'Yearly'
	interval: number; // X => Every X (days|weeks|months|years)
	byDay: WeekDayToken[]; // ['Tu', 'Fr']
	byMonthDay: number; // Day of the month (eg. 16th OR 2nd friday of the month)
	byMonth: number; // Month number (eg 1 => January & 12 => December)
	tagColor: string;
}

export interface CalendarEventDB {
	event_id: number;
	event_date: string;
	event_name: string;
	event_desc: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	is_active: boolean;
	created_date: string;
	modified_date: string | null;
	tag_color: string | null;
}
export interface CalendarEventClient {
	eventID: number;
	eventDate: string;
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
	tagColor: string | null;
}

export interface EventInstanceDB {
	event_id: number;
	event_instance_id?: number;
	schedule_id: number;
	event_date: string;
	event_name: string;
	event_desc: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	is_active: boolean;
	created_date: string;
	modified_date: string | null;
	tag_color: string | null;
}
export interface EventInstanceClient {
	eventID: number;
	scheduleID: number;
	eventInstanceID?: number;
	eventDate: string;
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	createdDate: string;
	modifiedDate: string | null;
	tagColor: string | null;
}

export interface EventDetailsDB {
	details_id: number;
	event_id: number;
	notes: string;
	url: string;
	location: string;
	created_date: string;
	modified_date: string;
	is_active: boolean;
}

export interface EventDetailsClient {
	detailsID: number;
	eventID: number;
	notes: string;
	url: string;
	location: string;
	createdDate: string;
	modifiedDate: string;
	isActive: boolean;
}

export interface MonthlyEventSummaryDB {
	target_date: string;
	has_event: boolean;
}
export interface MonthlyEventSummaryClient {
	eventDate: string;
	hasEvent: boolean;
}

export interface CalendarScheduleDB {
	schedule_id: number;
	event_id: number;
	start_date: string;
	end_date: string;
	interval: number;
	frequency: EventFrequency;
	by_day: string[];
	by_month: number;
	by_month_day: number;
	created_date: string;
	modified_date: string;
	is_active: boolean;
}
export interface CalendarScheduleClient {
	scheduleID: number;
	eventID: number;
	startDate: string;
	endDate: string;
	interval: number;
	frequency: EventFrequency;
	byDay: string[];
	byMonth: number;
	byMonthDay: number;
	createdDate: string;
	modifiedDate: string;
	isActive: boolean;
}

// WORKOUT TYPES
export type ActivityType =
	| "Lift"
	| "Walk"
	| "Run"
	| "Stretch"
	| "Cardio"
	| "Swim"
	| "Stairs"
	| "Timed"
	| "More";

export interface WorkoutPlanDB {
	plan_id: number;
	workout_type_id: number;
	plan_name: string;
	plan_desc: string;
	target_weight: number;
	target_reps: number;
	target_sets: number;
	target_mins: number;
	target_steps: number;
	target_miles: number;
	is_active: boolean;
	created_date: string;
}

export interface WorkoutPlanClient {
	workoutTypeID: number;
	planID: number;
	planName: string;
	planDesc: string;
	planWeight: number;
	planReps: number;
	planSets: number;
	planMins: number;
	isActive: boolean;
	createdDate: string;
}

// Specific one-off log entry
export interface WorkoutLogDB {
	log_id: number;
	user_id: string;
	workout_type_name: string;
	reps: number;
	sets: number;
	weight: number;
	miles: number;
	steps: number;
	workout_mins: number;
	start_time: string | null;
	end_time: string | null;
	workout_date: string;
	is_active: boolean;
	created_date: string;
}

export interface WorkoutLogClient {
	workoutType: string;
	userID: string;
	logID: number;
	reps: number;
	sets: number;
	weight: number;
	miles: number;
	steps: number;
	mins: number;
	startTime: string | null;
	endTime: string | null;
	date: string;
	isActive: boolean;
	createdDate: string;
}

// PAYLOAD TYPES

export interface NewWorkoutPlanPayload {
	workoutTypeID: number;
	name: string;
	desc: string;
	weight: number;
	reps: number;
	sets: number;
	mins: number;
	steps?: number;
	miles?: number;
}
export interface CreateHistoryEntryValues {
	userID: string;
	workoutID: number;
	date: Date | string;
	mins: number;
	startTime: Date | string;
	endTime: Date | string;
}

export interface MarkHistoryEntryValues {
	userID: string;
	workoutID: number;
	isCompleted: boolean;
	date: Date | string;
	startTime: Date | string;
	endTime: Date | string;
}

export interface CreateLogValues {
	workoutTypeID: number;
	mins: number; // mins
	reps: number;
	sets: number;
	weight: number;
	steps: number;
	miles: number;
	startTime: string;
	endTime: string;
	date: string;
}

export interface NewEventPayload {
	userID: string;
	newEvent: CreateEventVals;
}

export interface CreateNewWorkoutPayload {
	userID: string;
	newEvent: CreateEventVals;
	newWorkout: NewWorkoutPlanPayload;
}

export interface RecurringWorkoutPayload extends NewEventPayload {
	newWorkout: {
		planID: number;
		workoutName: string;
		workoutDesc: string;
	};
}

export interface NewWorkoutPayload {
	planID: number;
	workoutName: string;
	workoutDesc: string;
}

export interface NewUserWorkoutPayload {
	workout: UserWorkoutPayload;
	schedule: CreateEventVals;
}

// Recurring Workout w/ Plan data
export interface NewWorkoutEventPayload {
	title: string;
	desc: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	frequency: EventFrequency;
	interval: number;
	byDay: WeekDayToken[];
	byMonthDay: number;
	byMonth: number;
	// optional
	location: string;
	url: string;
	notes: string;
	// recurrence indicators
	isRecurring?: boolean;
	noEndDate?: boolean;
}

export interface NewWorkoutAndPlanPayload {
	workoutTypeID: number;
	planName: string;
	planDesc: string;
	notes: string;
	mins: number; // mins
	// weighted
	weight: number;
	reps: number;
	sets: number;
	// distance
	steps: number;
	miles: number;
}

export type RecurringWorkoutAndPlanPayload = {
	newEvent: NewWorkoutEventPayload;
	newWorkout: NewWorkoutAndPlanPayload;
};

export type RecurringWorkoutEventPayload = RecurringWorkoutAndPlanPayload & {
	userID: string;
};

export interface QuickWorkoutValues {
	name: string;
	desc: string;
	time: string;
	tagColor: string;
	activityType: ActivityType | string;
	mins: number;
	// optional & not available in <CreateQuickWorkout/> modal
	weight?: number;
	reps?: number;
	sets?: number;
	steps?: number;
	miles?: number;
	// datetime stuff
	date: string;
	startTime: string;
	endTime: string;
}
export interface QuickWorkoutPayload {
	userID: string;
	workout: QuickWorkoutValues;
}

// 'get_workouts_by_date()'
export interface UserWorkoutEventDB {
	event_id: number;
	workout_id: number;
	schedule_id: number;
	event_name: string;
	event_desc: string;
	event_date: string;
	start_time: string;
	end_time: string;
	created_date: string;
	tag_color: string | null;
}

export interface UserWorkoutEventClient {
	eventID: number;
	workoutID: number;
	scheduleID: number;
	eventName: string;
	eventDesc: string;
	eventDate: string;
	startTime: string;
	endTime: string;
	createdDate: string;
	tagColor: string | null;
}

// SUMMARY TYPES

export interface MinsSummaryDB {
	date: string;
	total_mins: number;
	week_day: string;
	log_count: number;
}
export interface MinsSummaryClient {
	date: string;
	totalMins: number;
	weekday: string;
	logCount: number;
}

export interface RangeSummary {
	totalMins: number;
	totalReps: number;
	totalMiles: number;
	totalSteps: number;
	totalNumOfWorkouts: number;
	totalNumOfWorkoutTypes: number;
}

export interface CustomDateRange {
	startDate: string;
	endDate: string;
}

export interface StreakDayDB {
	day: Date | string;
	is_completed: boolean | null;
}
export interface StreakDayClient {
	day: Date | string;
	isCompleted: boolean | null;
}

export interface DiffSummaryByWeek {
	currentWeek: {
		dateRange: CustomRange;
		totals: RangeTotalsClient;
		perDayTotals: MinsSummaryClient[];
		perDayStreak: StreakDayClient[];
	};
	prevWeek: {
		dateRange: CustomRange;
		totals: RangeTotalsClient;
		perDayTotals: MinsSummaryClient[];
		perDayStreak: StreakDayClient[];
	};
}

export interface UserWorkoutDB {
	user_id: string;
	workout_id: number;
	workout_name: string;
	workout_desc: string;
	plan_id: number;
	created_date: string;
	is_active: boolean;
}
export interface UserWorkoutClient {
	userID: string;
	workoutID: number;
	name: string;
	desc: string;
	planID: number;
	createdDate: string;
	isActive: boolean;
}

export interface UserWorkoutPlanDB extends WorkoutPlanDB {
	workout_id: number;
	workout_name: string;
	workout_desc: string;
}
export interface UserWorkoutPlanClient extends WorkoutPlanClient {
	workoutID: number;
	workoutName: string;
	workoutDesc: string;
}

export interface UserWorkoutByDateDB {
	workout_id: number;
	schedule_id: number;
	event_id: number;
	start_time: string;
	end_time: string;
	tag_color: string | null;
	workout_type_name: string;
	workout_name: string;
	workout_desc: string;
	weight: number;
	mins: number;
	miles: number;
	steps: number;
	reps: number;
	sets: number;
	created_date: string;
}

export interface UserWorkoutByDateClient {
	workoutID: number;
	scheduleID: number;
	eventID: number;
	startTime: string;
	endTime: string;
	tagColor: string | null;
	workoutType: string;
	name: string;
	desc: string;
	weight: number;
	sets: number;
	mins: number;
	reps: number;
	miles: number;
	steps: number;
	createdDate: string;
}

export interface WorkoutCustomDB extends UserWorkoutByDateDB {
	workout_status: WorkoutStatus;
	activity_type: string;
}
export interface WorkoutCustomClient extends UserWorkoutByDateClient {
	workoutStatus: WorkoutStatus;
	activityType: string;
}

export interface CancelledWorkoutDB {
	cancel_id: number;
	workout_id: number;
	cancel_date: string;
	cancelled_by: string;
	created_date: string;
	modified_date: string;
}
export interface CancelledWorkoutClient {
	cancelID: number;
	workoutID: number;
	cancelDate: string;
	cancelledBy: string;
	createdDate: string;
	modifiedDate: string;
}
export interface WorkoutHistoryDB {
	history_id: number;
	workout_id: number;
	workout_type: string;
	activity_type: string;
	workout_name: string;
	workout_desc: string;
	workout_date: string;
	start_time: string;
	end_time: string;
	notes: string;
	// target
	target_mins: number;
	target_reps: number;
	target_sets: number;
	target_steps: number;
	target_miles: number;
	target_weight: number;
	// recorded
	recorded_mins: number;
	recorded_reps: number;
	recorded_sets: number;
	recorded_steps: number;
	recorded_miles: number;
	recorded_weight: number;
	created_date: string;
	is_active: boolean;
}

export interface WorkoutHistoryClient {
	historyID: number;
	workoutID: number;
	workoutType: string;
	activityType: string;
	name: string;
	desc: string;
	date: string;
	startTime: string;
	endTime: string;
	notes: string;
	// target
	// target
	targetMins: number;
	targetReps: number;
	targetSets: number;
	targetMiles: number;
	targetSteps: number;
	targetWeight: number;
	// actual
	recordedMins: number;
	recordedReps: number;
	recordedSets: number;
	recordedMiles: number;
	recordedSteps: number;
	recordedWeight: number;
	createdDate: string;
	isActive: boolean;
}
export interface WorkoutHistoryRecordDB {
	history_id: number;
	workout_id: number;
	user_id: string;
	workout_date: string;
	start_time: string;
	end_time: string;
	workout_mins: number;
	reps: number;
	sets: number;
	steps: number;
	miles: number;
	notes: string;
	created_date: string;
	is_active: boolean;
}
export interface WorkoutHistoryRecordClient {
	historyID: number;
	workoutID: number;
	userID: string;
	workoutDate: string;
	startTime: string;
	endTime: string;
	workoutMins: number;
	reps: number;
	sets: number;
	steps: number;
	miles: number;
	notes: string;
	createdDate: string;
	isActive: boolean;
}
