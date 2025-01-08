import { createAppSlice } from "../createAppSlice";
import { CourseType } from '@/types/course';
import { ActionCreatorWithPayload, AsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface CourseFilters {
  include_archived?: boolean;
  course_name?: string;
  course_day?: string;
  course_instructor?: string;
  course_semester?: string;
  course_code?: string;
  course_status?: string;
}

interface CourseState {
  courses: CourseType[];
  selectedCourse: CourseType | null;
  loading: boolean;
  error: string | null;
  archivedCount: number;
}

type FetchCoursesResponse = {
  data: CourseType[];
  archivedCount: number;
};

type CourseResponse = {
  data: CourseType;
};

type ThunkConfig = {
  state: { courses: CourseState };
  rejectValue: string;
};

interface CourseActions {
  clearSelectedCourse: ActionCreatorWithPayload<void>;
  fetchCourses: AsyncThunk<FetchCoursesResponse, CourseFilters | undefined, ThunkConfig>;
  fetchCourseById: AsyncThunk<CourseResponse, string, ThunkConfig>;
  createCourse: AsyncThunk<CourseResponse, Partial<CourseType>, ThunkConfig>;
  updateCourse: AsyncThunk<CourseResponse, { id: string; data: Partial<CourseType> }, ThunkConfig>;
  deleteCourse: AsyncThunk<string, string, ThunkConfig>;
  archiveCourse: AsyncThunk<CourseResponse, string, ThunkConfig>;
  unarchiveCourse: AsyncThunk<CourseResponse, string, ThunkConfig>;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  archivedCount: 0,
};

export const courseSlice = createAppSlice({
  name: "courses",
  initialState,
  reducers: create => ({
    clearSelectedCourse: create.reducer(state => {
      state.selectedCourse = null;
    }),
    
    fetchCourses: create.asyncThunk(
      async (filters: CourseFilters = {}, { rejectWithValue }) => {
        try {
          const queryParams: Record<string, string> = {};
          
          if (filters.include_archived !== undefined) {
            queryParams.include_archived = filters.include_archived.toString();
          }
          if (filters.course_name) {
            queryParams.course_name = filters.course_name;
          }
          if (filters.course_day) {
            queryParams.course_day = filters.course_day;
          }
          if (filters.course_instructor) {
            queryParams.course_instructor = filters.course_instructor;
          }
          if (filters.course_semester) {
            queryParams.course_semester = filters.course_semester;
          }
          if (filters.course_code) {
            queryParams.course_code = filters.course_code;
          }
          if (filters.course_status) {
            queryParams.course_status = filters.course_status;
          }

          const response = await fetch('/api/courses?' + new URLSearchParams(queryParams));
          if (!response.ok) throw new Error('Failed to fetch courses');
          return response.json();
        } catch (error: any) {
          return rejectWithValue(error.message || 'Failed to fetch courses');
        }
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.courses = action.payload.data;
          state.archivedCount = action.payload.archivedCount;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch courses';
        },
      }
    ),

    fetchCourseById: create.asyncThunk(
      async (id: string) => {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) throw new Error('Failed to fetch course');
        return response.json();
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.selectedCourse = action.payload.data;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch course';
        },
      }
    ),

    createCourse: create.asyncThunk(
      async (courseData: Partial<CourseType>) => {
        const response = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData),
        });
        if (!response.ok) throw new Error('Failed to create course');
        return response.json();
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.courses.push(action.payload.data);
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to create course';
        },
      }
    ),

    updateCourse: create.asyncThunk(
      async ({ id, data }: { id: string; data: Partial<CourseType> }) => {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update course');
        return response.json();
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          const index = state.courses.findIndex(course => course.id === action.payload.data.id);
          if (index !== -1) {
            state.courses[index] = action.payload.data;
          }
          if (state.selectedCourse?.id === action.payload.data.id) {
            state.selectedCourse = action.payload.data;
          }
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to update course';
        },
      }
    ),

    deleteCourse: create.asyncThunk(
      async (id: string) => {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete course');
        return id;
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.courses = state.courses.filter(course => course.id !== action.payload);
          if (state.selectedCourse?.id === action.payload) {
            state.selectedCourse = null;
          }
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to delete course';
        },
      }
    ),

    archiveCourse: create.asyncThunk(
      async (id: string) => {
        const response = await fetch(`/api/courses/${id}/archive`, {
          method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to archive course');
        return response.json();
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          const index = state.courses.findIndex(course => course.id === action.payload.data.id);
          if (index !== -1) {
            state.courses[index] = action.payload.data;
          }
          if (state.selectedCourse?.id === action.payload.data.id) {
            state.selectedCourse = action.payload.data;
          }
          state.archivedCount += 1;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to archive course';
        },
      }
    ),

    unarchiveCourse: create.asyncThunk(
      async (id: string) => {
        const response = await fetch(`/api/courses/${id}/unarchive`, {
          method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to unarchive course');
        return response.json();
      },
      {
        pending: state => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          const index = state.courses.findIndex(course => course.id === action.payload.data.id);
          if (index !== -1) {
            state.courses[index] = action.payload.data;
          }
          if (state.selectedCourse?.id === action.payload.data.id) {
            state.selectedCourse = action.payload.data;
          }
          state.archivedCount -= 1;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to unarchive course';
        },
      }
    ),
  }),
  selectors: {
    selectCourses: state => state.courses,
    selectSelectedCourse: state => state.selectedCourse,
    selectLoading: state => state.loading,
    selectError: state => state.error,
    selectArchivedCount: state => state.archivedCount,
  },
});

export const  {
  clearSelectedCourse,
  fetchCourses,
  fetchCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  archiveCourse,
  unarchiveCourse,
} = courseSlice.actions;

export const {
  selectCourses,
  selectSelectedCourse,
  selectLoading,
  selectError,
  selectArchivedCount,
} = courseSlice.selectors;

export default courseSlice.reducer;