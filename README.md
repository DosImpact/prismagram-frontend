# 4 Frontend Setup

# 4.0 CRA Cleanup and Installation (5:45)

- 환경 설치

- yarn add styled-components react-router-dom prop-types react-helmet styled-reset
- yarn add react-toastify
  (- yarn add react-apollo-hooks apollo-boost graphql graphql-tag)
- yarn add @apollo/react-hooks apollo-boost graphql graphql-tag

# 4.1 GlobalStyles and Theme (12:06)

- Styles / 글로벌 스타일 컴포넌트 적용 ( 폰트 , reset css ,)
- Styles / Theme컴포넌트 기능!! : 색상을 따로 빼서 -> ThemeProvider 컴포넌트 사용. from "styled-component"

# 4.2 React Router (9:15)

- 로그인이 된 경우와 안된 경우를 route해서 처리를 했다. 캬 ~ 애초에 분리를 시켜버리네.

# 4.3 Apollo Client (12:06)

- Apollo - Client 아폴로 클라이언트 연결해줌
- ApolloClient - ClientState에 미니 리덕스 탑재 : 로그인 처리.

# //resolvers의 세번쨰 인자가 의문이네... 두번째 인자도, 기본 리소버랑 다른 매커니즘인듯

```js
------------------------------------------------------------------------- 클라이언트 state에 들어갈 디폴트(스테이트)와 리소버 정의
// defaults는 Graphql문법이 아닌, state  개념이다.
export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};
//resolvers의 세번쨰 인자가 의문이네... 두번째 인자도, 기본 리소버랑 다른 매커니즘인듯
export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      window.location.reload();
      return null;
    }
  }
};
------------------------------------------------------------------------- ApolloClient에 clientState 넣기
import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers
  }
});

------------------------------------------------------------------------- @client를 통해 clientState임을 알려
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
------------------------------------------------------------------------- 아폴로 훅을 통해. 데이터를 받아옴.
import { useQuery } from "react-apollo-hooks";

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
        <Router isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
};
```

# 4.4 First Hooks Query

- 아폴로 훅 사용해보기. gql이 원래는 graphql-tag에서 가져왔는데, apollo-boost에서 가져왔네, 클라이언트도,
- useQuery는 쿼리문을 넣고, data,error,loading 을 반환 const { data, error, loading } = useQuery(GET_DOGS);
- 쿼리문에 @client를 통해, localState에 접근한다.

```js
...
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const { data } = useQuery(QUERY);
  console.log(data);
  return (
    <>
      <ThemeProvider theme={Theme}>
        <>
          <AppRouter isLoggedIn={false} />
          <GlobalStyles />
        </>
      </ThemeProvider>
    </>
  );
};
```

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

# 5 Frontend: Authorization Routes

# 5.0 Auth Route UI part One (6:50)

- 훅을 써서 Container,Presenter를 되도록 줄이겠지만, 필요하다면 사용해도 된다.
- Auth.js 작업

# 5.1 Footer and Auth UI part Two (5:00)

- 다자인 작업1

# 5.2 Footer and Auth UI part Three (5:00)

- 다자인 작업2

# 5.3 Auth Form with Hooks (10:36)

- Input 후킹

```
//input 훅 정리

//리액트 컴포넌트의 특성을 이용 + useState(get,set)을 이용해, 간단하게, 해당 컴포넌트의 onChange value를 다룰 수 있다.
1. Input 컴포넌트 정의 -> 훅의 get,set props가 들어오면, value와,onChange 연결하기
2. 훅정의 -> 값 받으면 -> value,onChange를 반환해준다.
3. 훅사용 -> useInput("") 기본값 정의 및 반환하는 (배열) -> 컴포넌트에 ...오퍼레이션 으로 후킹.

```

# 5.4 requestSecret Mutation and Refactor (12:03)

# 5.5 Toastify and createAccount Mutation (14:17)

- Toastify는 웹 페이지 구석에서 나오는 알림창 같은건데, 이뻐서 좋다.

```
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
```

# 5.6 createAccount Mutation part Two (13:03)

pass

# 5.7 createAccount Mutation part Three (8:30)

### useMutation 사용법 2가지

- useMutation 은 update,variables 을통해, 바로 udpate로직을 만들거나 |
- const [createAccountMutation] = useMutation 결과를 await 하여 데이터 받아 로직을 처리할수 있다.

```
          const { createAccount } = await createAccountMutation();
          if (!createAccount) {
            toast.success("Account Created! ");
          }
```

### Auth | Container-Queires-Presenter 한번에 같이보면됨.

- 1. 로그인 로직

```
import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
```

# 5.8 confirmSecret + Log In Mutation (16:03)

### 로컬 JWT 저장 구현, 로컬 스테이츠

# 6.0 Header UI (10:00)

### 아이콘스

[https://iconmonstr.com/instagram-11-svg/](https://iconmonstr.com/instagram-11-svg/)

### Header 컴포넌트 완성 | 아이콘 넣기 | 스타일 컴포넌트

# 6.1 Header Logic part One (13:44)

### Search input submit 시 serach term으로 routing 작업 |

# 6.2 Header Logic part Two (7:22)

# 7.0 Getting the Feed and Loader Component (11:43)

- Loader.js 작성했음.
- Feed.js 작성

# 7.1 Post Component part One (16:53)

# 7.2 Post Component part Two (16:07)

- Avatar.js 컴포넌트
- FatText.js 컴포넌트

### 인스타에서 좋아요를 눌렀다 안눌렀다하면, 바로 like에 반영되는데, 이는 useState를 이용해서, 반응을 기록하는 척 한다.

# 7.3 Post Component part Three (17:00)

[https://github.com/buildo/react-autosize-textarea](https://github.com/buildo/react-autosize-textarea)

- yarn add react-autosize-textarea

# 7.4 toggleLike on Post Component (14:15)

### 데이터 베이스를 기다리기 싫으면 FakeData를 사용자에게 보여주어서, 빠른 웹사이트라고 느끼게 해줘라.

- 좋아요 토글 기능 제작
- 1. 빠른 앱 반응 : 좋아요 토글시 - 상태 isLikeS,likeCountS 변화후 -> await 뮤테이션
- 2. 느린 앱 반응 : 좋아요 토글시 - await 뮤테이션 후 -> 상태 isLikeS,likeCountS 변화
- 3. 빠른 앱 반응 :(애초에 await를 안하기) : 좋아요 토글시 - 뮤테이션 후 -> 상태 isLikeS,likeCountS 변화

# 7.5 createComment on Post Component part One (15:49)

- 코맨트 컴포넌트 만들기 : 이슈 : 엔터를 치면 TextArea는 개행을 함-> onKeyPress 이벤트를 따로 파서 -> e.keyCode가 32면(즉 엔터) 면 코멘트 뮤테이션 실행 하는 로직
- onKeyUp 이랑 onKeyDown도 있는데, onKeyUp으로 엔터를 처리하면 -> 이미 press 되어서 textarea가 개행을 한다 -> preventdefaultEvent를 할수가 없어

# 7.6 createComment on Post Component part Two (13:59)

# 8 Frontend: Search

# 8.0 Search Screen Queries (15:11)

- Search 관련 쿼리작성 | UserCard작성
- useQuery에서 쿼리를 스킵하는 조건을 걸수도.

```js
const { data, loading } = useQuery(SEARCH, {
  skip: term === undefined,
  variables: {
    term
  }
});
```

# 8.1 Search Screen UI Part One (7:00)

# 8.2 Search Screen UI Part Two (11:06)

# 8.3 Follow Button (13:47)

# 8.4 SquarePost Component (15:02)

- Search Post 끝!!ㅜ ㅜ 복습 천국!

# 9 Frontend: Profile

# 9.0 Profile Screen part One (14:52)

# 9.1 Profile Screen part Two (12:55)

# 9.2 Log Out and Conclusions (5:26)
