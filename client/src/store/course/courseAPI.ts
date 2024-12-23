import axios from 'axios';

const baseUrl = '/api/courses'; 

// Fetch all courses with optional query parameters
export const getCourses = async (queryParams: Record<string, string> = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}${queryString ? `?${queryString}` : ''}`;
  const response = await axios.get(url);
  return response.data;
};

// Fetch a single course by ID
export const getCourseById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// Create a new course
export const createCourse = async (courseData: Record<string, any>) => {
  const response = await axios.post(baseUrl, courseData);
  return response.data;
};

// Update a course by ID
export const updateCourse = async (id: string, updateData: Record<string, any>) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateData);
  return response.data;
};

// Delete a course by ID
export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

// Archive a course by ID
export const archiveCourse = async (id: string) => {
  const response = await axios.patch(`${baseUrl}/${id}/archive`);
  return response.data;
};

// Unarchive a course by ID
export const unarchiveCourse = async (id: string) => {
  const response = await axios.patch(`${baseUrl}/${id}/unarchive`);
  return response.data;
};
