# 4 Frontend Setup

# 4.0 CRA Cleanup and Installation (5:45)

yarn add styled-components react-router-dom prop-types react-helmet styled-reset
yarn add react-apollo-hooks apollo-boost graphql graphql-tag

# 4.1 GlobalStyles and Theme (12:06)

# 4.2 React Router (9:15)

# 4.3 Apollo Client (12:06)

# 4.4 First Hooks Query (8:0

# 추가학습 리액트 훅

- 결론적으로, 훅은 함수형 컴포넌트에서도 state를 사용할수 있게 해주는것이다.
- useState랑 useEffect from "react" 변수 변경, 그리고 API 에서 데이터를 요청할때 사용함.
- useState는 배열로 2개원소 리턴 예제:

```js
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const updateEmail = e => {
    const {
      target: { value }
    } = e;
    setEmail(value);
  };
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      {count}
      <button onClick={() => setCount(count + 1)}>PLUSE</button>
      <button onClick={() => setCount(count - 1)}>MINUS</button>
      <input placeholder="email" onChange={updateEmail} />
      {email}
    </div>
  );
}
```
