import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
import { queryByLabelText } from "@testing-library/react";

const fetchSuperHeroes = () => {
  //return axios.get("http://localhost:4000/superheroes");
  return request({url: '/superheroes'})
};

const addSuperHero = (hero) => {
  //return axios.post("http://localhost:4000/superheroes", hero);
  return request({url: "/superheroes", method: "post", data: hero})
};

export const useSuperHerosData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    enabled: false,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   //queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueriesData('super-heroes', (oldQueryData) => {
    //     //데이터를 post 하고, 바뀐 데이터를 얻기위해 새로운 request 를 하지 않아도 mutate 할때 바뀐 데이터를 동시에 가져올 수 있다.
    //     return{
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // },

    //Optimistic Update: "낙관적 업데이트"로 서버 업데이트 시 UI 에서도 어차피 업데이트 할것이라는 (낙관적인)가정으로 미리 UI 를 업데이트 시켜주고 서버를 통해 검증을 받고 업데이트 or 롤백하는 방식

    //mutation 함수가 실행되기 전에 실행되고, mutatation 함수가 받을 동일한 변수가 전달된다. "optimistic update" 사용 시 유용한 함수이다.
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");//업데이트하기 전의 데이터를 미리 빼둠, roll back 하기 위함
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        //쿼리에 낙관적으로 적용될 내용을 추가한다.
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData, //onError 에서 context 로 받을 rollback(원상복구) 할 data 
      };
    },
    //onSuccess: () => {} 는 mutation 이 성공하고 결과를 전달할때 실행된다. 

    //onError 는 mutation 이 error 를 만났을 때 실행된다.
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);//rollback(원상복구)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    },//mutation 성공, 실패에 관계없이 실행됨, 성공한 데이터 or error 전달
  }); //addSuperHero 는 백엔드로 post 할 함수이다.
};
