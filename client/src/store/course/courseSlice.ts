import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, archiveCourse, unarchiveCourse } from './courseAPI';
import { CourseType } from '@/types/course';

interface CourseState {
  courses: CourseType[];
  selectedCourse: CourseType | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

// Thunks for async operations
export const fetchCourses = createAsyncThunk<CourseType[], Record<string, string>>(
  'courses/fetchCourses',
  async (queryParams = {}) => {
    return await getCourses(queryParams);
  }
);

export const fetchCourseById = createAsyncThunk<CourseType, string>(
  'courses/fetchCourseById',
  async (id) => {
    return await getCourseById(id);
  }
);

export const createNewCourse = createAsyncThunk<CourseType, Partial<CourseType>>(
  'courses/createCourse',
  async (courseData) => {
    return await createCourse(courseData);
  }
);

export const updateExistingCourse = createAsyncThunk<CourseType, { id: string; data: Partial<CourseType> }>(
  'courses/updateCourse',
  async ({ id, data }) => {
    return await updateCourse(id, data);
  }
);

export const deleteExistingCourse = createAsyncThunk<string, string>(
  'courses/deleteCourse',
  async (id) => {
    await deleteCourse(id);
    return id;
  }
);

export const archiveExistingCourse = createAsyncThunk<CourseType, string>(
  'courses/archiveCourse',
  async (id) => {
    return await archiveCourse(id);
  }
);

export const unarchiveExistingCourse = createAsyncThunk<CourseType, string>(
  'courses/unarchiveCourse',
  async (id) => {
    return await unarchiveCourse(id);
  }
);

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all courses
    builder.addCase(fetchCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action: PayloadAction<CourseType[]>) => {
      state.courses = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch courses';
    });

    // Fetch course by ID
    builder.addCase(fetchCourseById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<CourseType>) => {
      state.selectedCourse = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCourseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch course';
    });

    // Create new course
    builder.addCase(createNewCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewCourse.fulfilled, (state, action: PayloadAction<CourseType>) => {
      state.courses.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createNewCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create course';
    });

    // Update existing course
    builder.addCase(updateExistingCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateExistingCourse.fulfilled, (state, action: PayloadAction<CourseType>) => {
      const index = state.courses.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateExistingCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update course';
    });

    // Delete course
    builder.addCase(deleteExistingCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteExistingCourse.fulfilled, (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteExistingCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete course';
    });

    // Archive course
    builder.addCase(archiveExistingCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(archiveExistingCourse.fulfilled, (state, action: PayloadAction<CourseType>) => {
      const index = state.courses.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(archiveExistingCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to archive course';
    });

    // Unarchive course
    builder.addCase(unarchiveExistingCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(unarchiveExistingCourse.fulfilled, (state, action: PayloadAction<CourseType>) => {
      const index = state.courses.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(unarchiveExistingCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to unarchive course';
    });
  },
});

export const { clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
