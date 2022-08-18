import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      //페이지 증가 역할, pages 인자값으로 getNextPageParam 의 return 값이 들어간다.
      //data 에 load more 할때마다 값이 추가되는것임, 전체가 다 새로 로드되는거 아님.
      if (pages.length < 3) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, index) => {
          console.log(group);
          return (
            <div key={index}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} - {color.label}
                </h2>
              ))}
              {/* 이것도 가능, { return <h2 key={color.id}>{color.id} - {color.label}</h2>} */}
            </div>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
