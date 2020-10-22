import { configureStore } from "@reduxjs/toolkit";
import selectedCoursesReducer from "../actions/selectedCoursesSlice";

export default configureStore({
  reducer: {
    selectedCourses: selectedCoursesReducer
  }
});
