import useSWR from "swr";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { ar, ur } from "@faker-js/faker";

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

// Get Attendances
export const getAttendance = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/admin/attendance",
    fetch,
  );

  const attendance = data?.attendance;
  return { attendance, isLoading, error, mutate };
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
  return useSWRMutation("/api/attendance/session", createSession);
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
  return useSWRMutation("/api/attendance/mark", validateAttendance);
};

// ============================= STUDENT ATTENDANCE =========================== >

export const studentsData = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/attendance/studentAttendance",
    fetch,
  );
  return { data, isLoading };
};
// ==================================== ATTENDANCE LIST ====================== //

const attendance = async (
  url: string,
  { arg }: { arg: { sessionId: string } },
) => {
  const resp = await axios.post(url, { sessionId: arg.sessionId });
  return resp.data;
};

export const attendanceList = () => {
  return useSWRMutation("/api/attendance/attendanceList", attendance);
};

// ================================= TUTOR HISTORY ============================== //

export const tutorAttendanceHistory = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/attendance/tutorsAttendance",
    fetch,
  );

  return { data, isLoading };
};

// ================================= TUTOR'S COURSE ============================ //

export const tutorCourse = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/courses/tutor-courses",
    fetch,
  );

  return { data, isLoading };
};

// =================================== END SESSION ========================= //

const endSession = async (
  url: string,
  { arg }: { arg: { sessionId: string } },
) => {
  const resp = await axios.post(url, { sessionId: arg.sessionId });
  return resp.data;
};

export const endASession = () => {
  return useSWRMutation("/api/attendance/endSession", endSession);
};

// ============================ COURSE ENROLLMENT ======================= //

const enroll = async (url: string, { arg }: { arg: { courseId: string } }) => {
  const resp = await axios.post(url, { courseId: arg.courseId });
  return resp.data;
};

export const enrollCourse = () => {
  return useSWRMutation("/api/courses/enroll", enroll);
};

// ====================== STUDENT COURSE ========================= >

export const studentCourse = () => {
  const { data, isLoading, error } = useSWR(
    "/api/courses/student-course",
    fetch,
  );

  return {
    data,
    isLoading,
  };
};

// ================================ PROTECT STUDENT SCHEDULE PAGE ==============>

export const activeSession = () => {
  const { data, isLoading, error } = useSWR(
    "/api/attendance/protectScanPage",
    fetch,
  );

  return {
    data,
    isLoading,
  };
};

// ================================ TUTORS STUDENTS ============================ >

export const tutorStudent = () => {
  const { data, isLoading, error } = useSWR("/api/tutors-student", fetch);

  return {
    data,
    isLoading,
  };
};

// ============================ TUTORS ACTIVE SESSION ============================ >

// export const tutorActiveSession = () => {
//   const { data: activeSession, isLoading, error } = useSWR("/api/attendance/getTutorSession", fetch);
//   return {
//     activeSession,
//     isLoading
//   }
// }
