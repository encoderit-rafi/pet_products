import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Axios } from "@/axios";
import { omitEmpty } from "@/consts";

export const useInfiniteGetAllPlatforms = () => {
  const [params, setParams] = useState({
    category_id: "",
    search: "",
  });

  const fetchPlatforms = async ({ pageParam = 1 }) => {
    const response = await Axios.get("/marketing-platforms", {
      params: omitEmpty({
        page: pageParam,
        per_page: 20,
        ...params,
      }),
    });
    console.log("🚀 ~ fetchPlatforms ~ response:", response.data);
    return response?.data?.platforms;
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "use-infinite-get-all-marketing-platforms",
      params.category_id,
      params.search,
    ], // Re-fetch when search term changes

    queryFn: fetchPlatforms,
    getNextPageParam: (lastPage) =>
      lastPage?.next_page_url ? lastPage.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 10,
    // enabled: false,
    retry: false,
    keepPreviousData: true,
  });

  // Handle search and reset pagination
  const handleSearch = (params) => {
    setParams(params);
    // setSearchTerm(newSearchTerm);
    refetch(); // Reset query with new search term
  };

  return {
    data: data?.pages.flatMap((page) => page?.data) || [],
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    handleSearch,
  };
};
