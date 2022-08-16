import { useQuery } from "react-query";
import axios from "axios";

//전시간에 배웠던 concurrently fetch 는 "동시에" 여러 데이터들은 fetch 하는 것이고, 지금 배우는건 "연속적"으로 fetch 하는 법이다.

//해당 email 의 정보를 가진 유저 api 를 fetch 해와서, 가져온 데이터를 이용해 한번 더 정보를 fetch 한다.(sequentially fetch)

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCouresByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependenetQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId; //user 는 즉시 이용가능한게 아니라 로드될때까지 시간이 걸린다. 따라서 옵셔널 체이닝 연산자 사용해야함

  useQuery(["coures", channelId], () => fetchCouresByChannelId(channelId), {
    //enable: false 가 되면 쿼리가 비활성화된다, 데이터 요청에 사용할 파라미터(channel)가 유효한 값일때만 true 를 할당하는 식으로 활용할 수 있다. 유효한 값이 아닐땐 null 로 나온다.
    //이런 경우, 종속 쿼리라 부를 수 있으며, 실행하기 전에 완료되어야 하는 이전 쿼리에 의존한다.
    enabled: !!channelId,
  });

  return <div>DependentQueries</div>;
};
