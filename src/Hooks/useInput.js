import { useState } from "react";

export default defaultValue => {
  const [value, setValue] = useState(defaultValue);

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
};
/**
 * userInput에 값을 퉤 던지면, 그 값과, 바꿀수 있는 함수를 준다.
 */
