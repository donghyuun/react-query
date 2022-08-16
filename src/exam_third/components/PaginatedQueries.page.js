import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
      //keepPreviousData 가 true 이면 다음 창으로 넘어갈때(fetching할때) "이전 데이터가 남아있게" 되어 다음 데이터가 로드될때까지 자주 쓰는 "isLoading..."이 남는게 아니라 이전 데이터가 남아있다가 다음 데이터가 로드되면 자연스럽게 다음 화면으로 넘어가게 된다.
    }
  );

  if (isLoading) {
    //keepPreviousData: true 이면 isLoading 자체가 false 로 설정된다. 따라서 아래 문장은 나타날 일이 없음
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              {color.id} - {color.label}{" "}
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1} //disabled 옵션은 새로 안 사실
        >
          PREV
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === 3}
        >
          NEXT
        </button>
        {console.log(isLoading, isFetching)}
        {isFetching && "Loading" /*문자열보다 이모티콘이 더 나을듯*/}
      </div>
    </>
  );
};
