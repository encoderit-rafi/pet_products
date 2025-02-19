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
      const response = await Axios.get(
        `/media-kit/download/${brandId}/${category}/${fileName}`,
        { responseType: "blob" }
      );
      console.log("✅ ~ queryFn: ~ data:", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Set download filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
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
