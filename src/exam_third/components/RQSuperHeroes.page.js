import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import {
  useAddSuperHeroData,
  useSuperHerosData,
} from "../hooks/useSuperHerosData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHerosData(onSuccess, onError);

  const { mutate: addHero, isLoading: heroIsLoading, heroIsError, heroError } = useAddSuperHeroData();
  //자동으로 인자 넘어감, isLoading 만 쓰면 중복에러

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = {name, alterEgo}
    addHero(hero);
  };

  if (isFetching || isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    //console.log(error); 에러 시 에러내용 이걸로도 출력 가능
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
      />
      <button onClick={handleAddHeroClick}>Add Hero</button>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
