import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Axios } from "@/axios";
import { omitEmpty } from "@/consts";

export const useInfiniteGetAllCategories = () => {
  const [params, setParams] = useState({
    brand_id: "",
    search: "",
  });

  const fetchBrands = async ({ pageParam = 1 }) => {
    const response = await Axios.get("/marketing-categories", {
      params: omitEmpty({
        page: pageParam,
        per_page: 20,
        ...params,
      }),
    });
    console.log("🚀 ~ fetchBrands ~ response:", response);
    return response?.data.marketing_categories;
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
      "use-infinite-get-all-marketing-categories",
      params.brand_id,
      params.search,
    ], // Re-fetch when search term changes

    queryFn: fetchBrands,
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
    data: data?.pages.flatMap((page) => page.data) || [],
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    handleSearch,
  };
};
