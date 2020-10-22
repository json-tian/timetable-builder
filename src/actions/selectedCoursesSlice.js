import { createSlice } from "@reduxjs/toolkit";

export const selectedCoursesSlice = createSlice({
  name: "selectedCourses",
  initialState: {
    value: []
  },
  reducers: {
    setCourses: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedCourses = action.payload;
    }
  }
});

export const { setCourses } = selectedCoursesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSelectedCourses = state => state.selectedCourses;

export default selectedCoursesSlice.reducer;
