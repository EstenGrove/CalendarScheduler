# Calendar Workout Scheduler App

## Todos

**Component Fixes & Creations:**

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

**Consider Route-Based Fetching:**

- [StackOverflow for this wrapper concept](https://stackoverflow.com/questions/75383036/is-there-a-way-to-use-react-redux-dispatch-inside-the-loader-function-of-react-r)
- Migrate `<Route/>` components to `createBrowserRouter([...routes])`
- Migrate route `useEffect` data fetching into router `loader()`'s
  - Consider using a "wrapper" view that contains the child/nested routes & loaders

_NOTE: the "wrapper" concept is NOT recommended since routes should be declared OUTSIDE the render tree's scope, then passed to a provider INSIDE the render tree's scope!_
