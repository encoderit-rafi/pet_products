import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

export const useInfiniteGetBrands = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const fetchBrands = async ({ pageParam = 1 }) => {
    const response = await Axios.get("/brands", {
      params: {
        page: pageParam,
        per_page: PAGINATION.per_page,
        search,
      },
    });
    return response.data;
  };

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["infinite-brands", search],
      queryFn: fetchBrands,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === PAGINATION.per_page
          ? allPages.length + 1
          : undefined;
      },
      staleTime: 1000 * 60 * 10,
      keepPreviousData: true,
    });

  const handleSearch = (query) => {
    setSearchParams({ search: query });
    refetch();
  };

  return {
    data: data?.pages.flat() || [],
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    handleSearch,
  };
};
