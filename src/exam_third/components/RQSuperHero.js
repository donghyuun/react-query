import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  const { isLoading, data, isError, error } = useSuperHeroData(heroId);
    console.log(data)
  return <div>{data?.data.name} - {data?.data.alterEgo}</div>;
};
