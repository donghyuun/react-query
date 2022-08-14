import { useQuery } from "react-query";

function Profile(){
    //'username' 이란 key 값을 가진 쿼리데이터를 사용한다. 초기값 지정가능.
    const {data: username} = useQuery('username', { initialData: '', staleTime: Infinity});
    
    return <h1>{username}</h1>
}

export default Profile;