import useSWR from "swr";
import axios from "axios";
import useSWRMutation from "swr/mutation";

// fetcher function
const fetch = (url: string) => axios.get(url).then((res) => res.data);

// REQUEST POSTER function
const postData = (url: string, { arg }: { arg: any }) =>
  axios.post(url, arg).then((res) => res.data);

// PUT REQUEST function
const putData = (url: string, { arg }: { arg: any }) =>
  axios.put(url, arg).then((res) => res.data);

// Get current user
export const getCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/auth/me", fetch);

  const user = data?.user;
  return { user, isLoading, error, mutate };
};

// Get students data
export const getStudents = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/admin/students",
    fetch,
  );

  const students = data?.studentsData;
  return { students, isLoading, error, mutate };
};

// Get tutors data
export const getTutors = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/admin/tutors", fetch);

  const tutors = data?.tutorData;
  const coursesAssigned = data?.coursesAssigned;
  return { tutors, coursesAssigned, isLoading, error, mutate };
};

// Get courses data
export const getCourses = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/admin/courses",
    fetch,
  );

  const courses = data?.coursesData;
  return { courses, isLoading, error, mutate };
};

// Get available courses
export const getAllCourses = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/courses/available-courses",
    fetch,
  );

  const courses = data?.availableCourses;
  return { courses, isLoading, error, mutate };
};

// ============================= POST REQUESTS ======================== //
export const useAssignTutor = () => {
  return useSWRMutation("/api/courses/assign-tutor", postData);
};

// send forgot password request
export const useForgotPassword = () => {
  return useSWRMutation("/api/auth/forgot-password", postData);
};

// =========================== PUT REQUEST ================================ //

// Reset password request
export const useResetPassword = () => {
  return useSWRMutation("/api/auth/reset-password", putData);
};

// ============================ session ============================= >

const createSession = async (
  url: string,
  { arg }: { arg: { courseId: string } },
) => {
  const resp = await axios.post(url, { courseId: arg.courseId });
  return resp.data;
};

export const startSession = () => {
  return useSWRMutation("/api/session", createSession);
};
// ======================= Mark Attendance ============================ >

const validateAttendance = async (
  url: string,
  { arg }: { arg: { id: string; qrCode: string } },
) => {
  const resp = await axios.post(url, { id: arg.id, qrCode: arg.qrCode });
  return resp.data;
};

export const markAttendance = () => {
  return useSWRMutation("/api/mark", validateAttendance);
};
