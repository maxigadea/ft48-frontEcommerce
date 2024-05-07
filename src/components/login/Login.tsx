"use client";

import { LoginErrorProps, LoginProps } from "@/types";
import { validateLoginForm } from "@/utils/formValidations";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
  const router = useRouter();

  const [dataUser, setDataUser] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const [errorUser, setErrorUser] = useState<LoginErrorProps>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true' 
        },
        body: JSON.stringify(dataUser),
      })
        .then((res) => res.json())
        .then((json) => {
            const {token, user} = json;
            localStorage.setItem("userSession", JSON.stringify({token: token, userData: user}))
            
            router.push("/")
        });

      
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setErrorUser(errors);
  }, [dataUser]);

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <div>
        <h2>Sign in to Maxi Store</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="email-adress">Email</label>
            <input
              id="email-adress"
              name="email"
              value={dataUser.email}
              type="text"
              required
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
            {errorUser.email && <p>{errorUser.email}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={dataUser.password}
              type={showPassword ? "text" : "password"}
              required
              onChange={handleChange}
              placeholder="*******"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errorUser.password && <p>{errorUser.password}</p>}
          </div>

          <div>
            <button>Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
