import API from './axios.js';

export const getHomeCourses =async() => {
    const response=await API.get("/courses/home");
    return response.data;
   
}

export const getCourseDetails = async (courseId) => {
  const response = await API.get(`/courses/${courseId}`);
  return response.data;
};

export const createNewCourse=async (courseFormData) => {
  const response = await API.post("/courses/create",courseFormData);
  return response.data;
};

export const addLectureToCourse = async (courseId,lectureFormData) => {
  const response = await API.post(`/courses/${courseId}/lectures`,lectureFormData);
  return response.data;
 
};