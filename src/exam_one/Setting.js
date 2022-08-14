import { useState } from "react";
import {useSetClientState} from "./Hooks";

function Setting() {
  const [username, setUsername] = useState("");
  const setClientState = useSetClientState('username');//'username' key 값의 쿼리데이터 저장공간 생성

  //setClientState에 저장된 key 값의 저장공간에 username 값을 저장한다.
  const handleClick = () => setClientState(username);

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="button" onClick={handleClick}>update</button>
    </div>
  );
}
export default Setting;
