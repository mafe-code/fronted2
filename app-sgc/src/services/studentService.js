import axios from "axios";

const API_URL = "/students";

export const getStudents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await axios.post(API_URL, studentData);
  return response.data;
};

export const updateStudent = async (studentId, updatedData) => {
  const response = await axios.put(`${API_URL}/${studentId}`, updatedData);
  return response.data;
};

export const deleteStudent = async (studentId) => {
  const response = await axios.delete(`${API_URL}/${studentId}`);
  return response.data;
};