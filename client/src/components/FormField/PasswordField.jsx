// components/PasswordField.js
import React from "react";
import InputField from "./InputField";

const PasswordField = ({ label, id, register, error }) => (
  <InputField
    label={label}
    id={id}
    type="password"
    register={register}
    error={error}
  />
);

export default PasswordField;
