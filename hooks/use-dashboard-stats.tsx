import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useDashboardStats = () => {
  const { data, isLoading, error } = useSWR("/api/admin/stats", fetcher);

  return {
    stats: data?.stats,
    isLoading,
    isError: error,
  };
};

export default useDashboardStats;
