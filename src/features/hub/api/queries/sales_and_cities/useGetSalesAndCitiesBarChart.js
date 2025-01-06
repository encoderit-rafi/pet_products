import { Axios } from "@/axios";
import { useQuery } from "react-query";

export const useGetSalesAndCitiesBarChart = () => {
 return useQuery({
  queryKey: "get-sales-and-citiesr-bar-chart",
  queryFn: async () => {
   return (await Axios.get("/distributions/barchart?range=this_year&brand_id=4")).data.data;
  },
 });
};