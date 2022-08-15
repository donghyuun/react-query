import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = ({queryKey}) => {
    console.log(queryKey);
    const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery(["super-hero", heroId], fetchSuperHero/*() => fetchSuperHero(heroId)*/);
};

// () => fetchSuperHero(heroId) 말고 fetchSuperHero 만을 사용하면 
// 쿼리키인 ["super-hero", heroId] 가 자동으로 인자로 들어간다.

// 따라서 fetchSuperHero 에서 ({queryKey}) 로 받으면 인자에 해당 쿼리키 배열이 들어가고 queryKey[1] 로 heroId 를 사용할 수 있다.