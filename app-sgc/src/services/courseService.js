import axios from "axios";

const API_URL = "/courses";

export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await axios.post(API_URL, courseData);
  return response.data;
};

export const updateCourse = async (courseId, updatedData) => {
  const response = await axios.put(`${API_URL}/${courseId}`, updatedData);
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await axios.delete(`${API_URL}/${courseId}`);
  return response.data;
};