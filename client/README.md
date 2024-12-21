# Calendar Workout Scheduler App

## Todos

**Component Fixes & Creations:**

- Various Feature Ideas/Concepts:

  - Floating "In-Progress" island at the bottom of the screen.
    - When starting a workout or timer a floating island will appear at the bottom of the screen to denote an on-going or in-progress workout or timer is active, so that users can still use the page while not losing their states

- Create various components:

  - `<RadioButton/>`
  - `<RadioButtonGroup/>`
  - `<WorkoutSummary/>` (cards w/ workout totals: weekly mins, weekly reps etc, today etc)

- Create date & time components:

  - `<DatePicker/>`
  - `<TimePicker/>`
  - `<DateRangePicker/>`
  - `<MonthPicker/>`
  - `<YearPicker/>`

- Styles Related Fixes/Improvements:
  - Add blurred background overlay to `<ActionsBar/>` when open for readability
  - Add better color-degree separation for UI components
    - eg. Cards for workouts & history should stand out more from their backgrounds
  - Add gestures for various actions:
    - Swipe right on workouts in `/dashboard/workouts/week` list to mark as completed (or use menu dots)
    - Swipe left on workouts in `/dashboard/workouts/week` list to a delete a given workout instance or series of instances
  - Build reusable custom hook for gestures, if possible.

**Consider Route-Based Fetching:**

- [StackOverflow for this wrapper concept](https://stackoverflow.com/questions/75383036/is-there-a-way-to-use-react-redux-dispatch-inside-the-loader-function-of-react-r)
- Migrate `<Route/>` components to `createBrowserRouter([...routes])`
- Migrate route `useEffect` data fetching into router `loader()`'s
  - Consider using a "wrapper" view that contains the child/nested routes & loaders

_NOTE: the "wrapper" concept is NOT recommended since routes should be declared OUTSIDE the render tree's scope, then passed to a provider INSIDE the render tree's scope!_
