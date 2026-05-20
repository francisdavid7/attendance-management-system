import useSWR from "swr";
import axios from "axios";

const sendRequest = (url: string) => axios.get(url).then((res) => res.data);

const getCurrentUser = () => {
  const { data, isLoading, error } = useSWR("/api/auth/me", sendRequest);

  const user = data?.user;
  return { user, isLoading, error };
};

export default getCurrentUser;