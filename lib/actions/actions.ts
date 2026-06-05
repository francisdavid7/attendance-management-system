import useSWR from "swr";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { url } from "inspector";
import Students from "@/app/tutor/dashboard/students/page";


// fether function
const fetch = (url: string) => axios.get(url).then((res) => res.data);

// request poster function
const postData = (url: string, { arg }: { arg: any }) =>
  axios.post(url, arg).then((res) => res.data);

// Get current user
export const getCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/auth/me", fetch);

  const user = data?.user;
  return { user, isLoading, error, mutate };
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
  const coursesAssigned = data?.coursesAssigned;
  return { courses, isLoading, error, mutate };
};

// ============================= POST REQUESTS ====================================== //
export const useAssignTutor = () => {
  return useSWRMutation("/api/courses/assign-tutor", postData);
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

// ============================ session ============================= >

const createSession = async (url: string, { arg }: { arg: { courseId: string } }) => {
  const resp = await axios.post(url, { courseId: arg.courseId });
  return resp.data;
}

export const startSession = () => {
  return useSWRMutation("/api/attendance/session", createSession);
}
// ======================= Mark Attendance ============================ >

const validateAttendance = async (url: string, { arg }: { arg: { id: string, qrCode: string } }) => {
  const resp = await axios.post(url, { id: arg.id, qrCode: arg.qrCode });
  return resp.data;
}

export const markAttendance = () => {
  return useSWRMutation("/api/attendance/mark", validateAttendance)
}

//============================ Attendance Data ========================= //

const getSessionId = async (url: string, { arg }: { arg: { sessionId: any } }) => {
  const resp = await axios.post(url, { sessionId: arg.sessionId });
  return resp.data;
}

export const attendanceList = () => {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/attendance/attendanceList",
    getSessionId
  );

  return { trigger, data, isMutating, error };
};


// ================================ Student Attendance Data ================= //

export const studentsData = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/attendance/studentAttendance",
    fetch,
  )
  return { data, isLoading }
}