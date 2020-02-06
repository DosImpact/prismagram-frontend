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
      //window.location.reload();
      window.location = "/";
      return null;
    }
  }
};
