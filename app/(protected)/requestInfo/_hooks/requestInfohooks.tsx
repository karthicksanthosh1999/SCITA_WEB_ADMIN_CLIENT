import { useQuery } from "@tanstack/react-query";
import { getRequestInfo } from "./requestInformation.endPoints";

export const useRequestInfoQuery = ( page: number,limit: number ) => {
  return useQuery({
    queryKey: ["requestInfo", page, limit],
    queryFn: () => getRequestInfo(page, limit),
    placeholderData: (previousData) => previousData,
  });
};