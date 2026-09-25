
import axios from "axios";

const API_URL = "/enrollments";

export const getEnrollments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEnrollment = async (enrollmentData) => {
  const response = await axios.post(API_URL, enrollmentData);
  return response.data;
};

export const deleteEnrollment = async (enrollmentId) => {
  const response = await axios.delete(`${API_URL}/${enrollmentId}`);
  return response.data;
};