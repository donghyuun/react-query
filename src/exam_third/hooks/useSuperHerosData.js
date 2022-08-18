import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes',hero)
}

export const useSuperHerosData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    enabled:false,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero)//addSuperHero 는 백엔드로 post 할 함수이다.
}