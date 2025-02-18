import { Axios } from "@/axios";

import { useQuery } from "react-query";

export const useGetAllMediaKits = ({ brandId, category }) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [`get-all-users-media-kits-${brandId}-${category}`],
    enabled: !!brandId && !!category,
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      return (await Axios.get(`/media-kit/files/${brandId}/${category}`)).data;
    },
  });
  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
};
