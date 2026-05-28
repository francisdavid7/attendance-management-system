import useSWR from "swr";
import axios from "axios";

const fetch = (url: string) => axios.get(url).then((res) => res.data);

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
