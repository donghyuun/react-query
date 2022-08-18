import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { queryByLabelText } from "@testing-library/react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
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
    onSuccess: (data) => {
      //queryClient.invalidateQueries("super-heroes");
      queryClient.setQueriesData('super-heroes', (oldQueryData) => {
        //데이터를 post 하고, 바뀐 데이터를 얻기위해 새로운 request 를 하지 않아도 mutate 할때 바뀐 데이터를 동시에 가져올 수 있다.
        return{
          ...oldQueryData,
          data: [...oldQueryData.data, data.data]
        }
      })
    },
  }); //addSuperHero 는 백엔드로 post 할 함수이다.
};
