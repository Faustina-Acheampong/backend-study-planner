import axios from 'axios';
import { CourseType } from '@/types/course';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface CoursesApiResponse extends ApiResponse<CourseType[]> {
  count: number;
  archivedCount: number;
}

interface CourseFilters {
  include_archived?: boolean;
  course_name?: string;
  course_day?: string;
  course_instructor?: string;
  course_semester?: string;
  course_code?: string;
  course_status?: string;
}

export const getCourses = async (filters: CourseFilters = {}): Promise<CoursesApiResponse> => {
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

  const response = await axios.get('/api/courses', { params: queryParams });
  return response.data;
};

export const getCourseById = async (id: string): Promise<ApiResponse<CourseType>> => {
  const response = await axios.get(`/api/courses/${id}`);
  return response.data;
};

export const createCourse = async (courseData: Partial<CourseType>): Promise<ApiResponse<CourseType>> => {
  const response = await axios.post('/api/courses', courseData);
  return response.data;
};

export const updateCourse = async (id: string, updateData: Partial<CourseType>): Promise<ApiResponse<CourseType>> => {
  const response = await axios.put(`/api/courses/${id}`, updateData);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<ApiResponse<CourseType>> => {
  const response = await axios.delete(`/api/courses/${id}`);
  return response.data;
};

export const archiveCourse = async (id: string): Promise<ApiResponse<CourseType>> => {
  const response = await axios.patch(`/api/courses/${id}/archive`);
  return response.data;
};

export const unarchiveCourse = async (id: string): Promise<ApiResponse<CourseType>> => {
  const response = await axios.patch(`/api/courses/${id}/unarchive`);
  return response.data;
};