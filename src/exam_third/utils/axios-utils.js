import axios from "axios";

//기존의 axios 를 반복해서 사용했을때의 문제점:
//- api 를 호출할 때마다 axios 인스턴스를 계속 생성한다. => 비효율적
//- axios 마다 동일한 content-type, token 과 같은 헤더값 처리
//- axios timeout 시간, base URL 등에 대한 중복 처리
//=> 유지보수의 효율성 저하 및 코드가 복잡해짐

//따라서 axios intercepter 를 사용함으로써 axios 생성, 요청과 응답에 대한 전/후 처리 및 오류 처리가 가능하다.

const client = axios.create({ baseURL: "http://localhost:4000" }); //base URL(데이터를 요청할 기본 주소) 설정

export const request = ({ ...options }) => {
  //axios가 받는 모든 인자를 받아올 수 있다, 따라서 spread 문법 사용

  client.defaults.headers.common.Authorization = "Bearer token";//이부분은 JWT 의 기능과 유사한 "사용자 인증" 과 관련되었으며, 이와 관련된 내용은 추후 공부하도록 함  

  const onSuccess = (response) => response;
  const onError = (error) => {
    //optionally catch errors and additional logging here
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
  //성공 시 성공에 대한 응답, 실패 시 에러를 반환한다.
};
