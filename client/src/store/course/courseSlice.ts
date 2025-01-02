// courseSlice.ts
import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import axios from 'axios';
import { CourseType } from "@/types/course";

// Define the state interface
interface CourseState {
    courses: CourseType[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null
};

export const courseSlice = createAppSlice({
    name: "course",
    initialState,
    reducers: (create) => ({
        // Create course thunk
        createCourse: create.asyncThunk(
            async (courseData: Partial<CourseType>, { getState, rejectWithValue }) => {
                try {
                    const state = getState();
                    const accessToken = state.user.accessToken;

                    if (!accessToken) {
                        return rejectWithValue('No access token found');
                    }

                    const response = await axios.post('/api/courses', courseData, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (response.data.success) {
                        return response.data.data;
                    } else {
                        return rejectWithValue(response.data.message || 'Failed to create course');
                    }
                } catch (error: any) {
                    console.error('Create course error:', error.response?.data);
                    return rejectWithValue(
                        error.response?.data?.message || 
                        error.response?.data?.error ||
                        'Failed to create course'
                    );
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.courses.push(action.payload);
                    state.error = null;
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            }
        ),

        // Fetch courses thunk
        fetchCourses: create.asyncThunk(
            async ({ include_archived = false }: { include_archived: boolean }, 
                { getState, rejectWithValue }) => {
                try {
                    const state = getState();
                    const accessToken = state.user.accessToken;

                    if (!accessToken) {
                        return rejectWithValue('No access token found');
                    }

                    const response = await axios.get('/api/courses', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        },
                        params: { include_archived }
                    });

                    if (response.data.success) {
                        return response.data.data;
                    } else {
                        return rejectWithValue(response.data.message || 'Failed to fetch courses');
                    }
                } catch (error: any) {
                    console.error('Fetch courses error:', error.response?.data);
                    return rejectWithValue(
                        error.response?.data?.message || 
                        error.response?.data?.error ||
                        'Failed to fetch courses'
                    );
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.courses = action.payload;
                    state.error = null;
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            }
        )
    }),
    selectors: {
        selectCourses: (state) => state.courses,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    }
});

// Export actions
export const { createCourse, fetchCourses } = courseSlice.actions;

// Export selectors
export const { selectCourses, selectLoading, selectError } = courseSlice.selectors;

// Export reducer
export default courseSlice.reducer;1§