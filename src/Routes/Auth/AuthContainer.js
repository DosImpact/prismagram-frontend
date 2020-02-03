import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET } from "./AuthQueries";
import { toast } from "react-toastify";
/**
 * 두가지 액션 -> 계정을 만들거나 , 계정을 로그인 하려고 requestSecret하거나
 * action (Login) :  서밋 핸들 ->  await requestSecret();
 * action (singUp) : 서밋 핸들 ->  await createAccount();
 *
 * 서버에서 cathe error를 통해, 애러를 잡고, 잡은 메시지가 프론트까지 던져진다.
 * 

 */
/*
  
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
   *           
   const secret = await requestSecret();
   console.log(secret);
 */
export default () => {
  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You dont have an account yet, create one");
        //setTimeout(() => setAction("signUp"), 3000); 자동으로 가입하기 창으로 넘어감.
      } else {
        toast.success("login secret sended!!");
        setAction("confirm");
      }
    },
    variables: { email: email.value }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: name.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: secret.value
    }
  });
  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          await requestSecret();
          // const secret = await requestSecret();
          // console.log(secret);
        } catch (error) {
          console.log(error);
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        name.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.success("Account Created! ");
            setTimeout(() => setAction("logIn"), 10);
          } else {
            toast.error("Can't create Account, try again");
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret }
          } = await confirmSecretMutation();
          console.log(confirmSecret);
          //TODO : log user in JWT
        } catch {
          toast.error("cant confirm secret");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      name={name}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
      secret={secret}
    ></AuthPresenter>
  );
};

/** 컨테이너
 *  모든 state,query,data,hook 전부 들어간다.
 *  프리젠터
 *  디자인 CSS
 */
