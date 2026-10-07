import API from './axios.js';

export const getHomeCourses =async() => {
    const response=await API.get("/courses/home");
    return response.data;
   
}

export const getCourseDetails = async (courseId) => {
  const response = await API.get(`/courses/${courseId}`);
  return response.data;
};