import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";

import "./styles.css";

export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({});
  const newpassword = useRef({});

  password.current = watch("password", "");
  newpassword.current = watch("password_repeat", "");
  const onSubmit = async (data) => {
    if (password.current.length === 0) {
      alert("You must specify a password");
      return;
    }

    var match = password.current.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])(?=\D*\d)/
    );
    if (!match) {
      alert(
        "Password Should contain at least one Number, one upperCase and one lowercase letter and a special character"
      );
      return;
    }

    if (password.current.length < 8) {
      alert("Password must have at least 8 characters");
      return;
    }

    if (newpassword.current !== password.current) {
      alert("The passwords do not match");
      return;
    }

    alert("Your Success message");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Password</label>
      <input {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Repeat password</label>
      <input {...register("password_repeat")} />
      {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);