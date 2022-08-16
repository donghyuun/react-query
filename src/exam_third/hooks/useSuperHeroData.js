import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  console.log(queryKey);
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["super-hero", heroId],
    fetchSuperHero /*() => fetchSuperHero(heroId)*/,
    {
      initialData: () => {
        //queryClient 는 react query 의 가장 상위계층
        const hero = queryClient
          .getQueryData("super-heroes")
          //옵셔널 체이닝 연산자 중요!! 있으면 찾고 없으면 그냥 실행안시킴(에러 안남)
          ?.data?.find((hero) => hero.id === parseInt(heroId));

          //찾고 있는 hero 데이터가 queryClient 에 존재하면 쿼리 데이터로 해당 데이터를 줘버리면 된다. 굳이 fetch 안해도 이미 queryClient가 가지고 있는 데이터를 사용하면 된다.
          if(hero){
            return {data: hero}
          }else{
            return undefined
          }
      },
    }
  );
};

// () => fetchSuperHero(heroId) 말고 fetchSuperHero 만을 사용하면
// 쿼리키인 ["super-hero", heroId] 가 자동으로 인자로 들어간다.

// 따라서 fetchSuperHero 에서 ({queryKey}) 로 받으면 인자에 해당 쿼리키 배열이 들어가고 queryKey[1] 로 heroId 를 사용할 수 있다.
