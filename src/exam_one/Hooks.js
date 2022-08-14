import { useQuery, useQueryClient } from "react-query";

//커스텀 훅

//해당 key 값의 쿼리데이터를  저장할 수 있는 커스텀 훅
export const useSetClientState = (key) => {
  const queryClient = useQueryClient();
  return (state) => queryClient.setQueryData(key, state);
};

//해당 key 값의 쿼리데이터를 사용할 수 있는 커스텀 훅
export const useClientValue = (key, initialData) => 
  useQuery(key, {
    initialData,
    staleTime: Infinity,
  }).data;
