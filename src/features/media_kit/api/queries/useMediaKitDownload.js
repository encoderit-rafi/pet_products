import { Axios } from "@/axios";

import { useQuery } from "react-query";

export const useMediaKitDownload = ({ brandId, category, fileName }) => {
  const { data, isLoading, isFetching, refetch, isSuccess } = useQuery({
    queryKey: [`media-kits-download${brandId}-${category}-${fileName}`],
    enabled: false,
    retry: false,
    keepPreviousData: true,
    staleTime: 0,
    queryFn: async () => {
      return (
        await Axios.get(
          `/media-kit/download/${brandId}/${category}/${fileName}`
        )
      ).data;
    },
  });
  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  };
};
