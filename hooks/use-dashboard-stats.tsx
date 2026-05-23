import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface Stats {
  totalStudents: number;
  totalTutors: number;
  totalCourses: number;
}

const useDashboardStats = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/admin/stats",
    fetcher,
  );

  const stats: Stats = data?.stats;

  return {
    stats,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useDashboardStats;
