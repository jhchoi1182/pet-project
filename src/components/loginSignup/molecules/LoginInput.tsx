import React from "react";

export default function LoginInput() {
  return (
    <div className={`flex flex-col gap-[53px] mt-[55px]`}>
      <Input variant="login" label="아이디" name="id">
        <Input.TextField
          variant="login"
          onChange={handleInputChange}
          required
        />
      </Input>
      <Input variant="login" label="비밀번호" name="password">
        <Input.TextField
          variant="login"
          onChange={handleInputChange}
          required
        />
      </Input>
    </div>
  );
}
