import { Axios } from "@/axios";

import { useQuery } from "react-query";

export const useShowMediaKitFile = ({ brandId, category, fileName }) => {
  const { data, isLoading, isFetching, refetch, isSuccess } = useQuery({
    queryKey: [`media-kits-show-${brandId}-${category}-${fileName}`],
    enabled: false,
    retry: false,
    keepPreviousData: true,
    staleTime: 0,
    queryFn: async () => {
      return await Axios.get(
        `/media-kit/show-file/${brandId}/${category}/${fileName}`,
        { responseType: "blob" }
      );
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
