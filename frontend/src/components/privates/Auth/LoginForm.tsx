import { apiBase } from "@apis";
import { Email } from "@assets/icons/Email";
import { Lock } from "@assets/icons/Lock";
import { PrimaryButton } from "@components/shares/Buttons";
import { PrimaryInputText } from "@components/shares/Inputs";
import { useAuth } from "@contexts";
import { IApiBaseError } from "@interfaces/api";
import { IApiBaseLoginForm } from "@interfaces/auth/login";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialLoginFormData: IApiBaseLoginForm = {
  email: "",
  password: ""
};

export const LoginForm = () => {
  const navigate = useNavigate();

  // Login functionality
  const { login } = useAuth();
  const [loginFormData, setLoginFormData] = useState<IApiBaseLoginForm>(initialLoginFormData);
  const apiBaseError = apiBase().error<IApiBaseError>();

  const handleLoginFormDataChange = (
    name: keyof IApiBaseLoginForm,
    value: string
  ) => {
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await login(loginFormData.email, loginFormData.password);

      if (res.status === "success") {
        toast.success(res.message);
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage() ?? "Error occurred");
    }
  };

  // Animation
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10); // Trick for trigger

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-black-01 mt-20 px-6">Log In</h1>
      <div
        className={`absolute left-0 w-full h-[80vh] z-10 bg-neutral-0 rounded-t-2xl px-6 py-7 transition-all ease-in-out duration-500 
        ${loading ? "-bottom-full" : "bottom-0"}
        overflow-y-auto`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <PrimaryInputText
              id="email"
              placeholder="Email"
              icon={
                <Email
                  fillClassName="fill-input-icon"
                  strokeClassName="stroke-white-01"
                />
              }
              value={loginFormData.email}
              setValue={(e) => handleLoginFormDataChange("email", e.target.value)}
              error={apiBaseError.getErrors("email")?.[0].toString()}
            />

            <div>
              <PrimaryInputText
                id="password"
                type="password"
                placeholder="Password"
                icon={<Lock fillClassName="fill-input-icon" />}
                value={loginFormData.password}
                setValue={(e) =>
                  handleLoginFormDataChange("password", e.target.value)
                }
                error={apiBaseError.getErrors("password")?.[0].toString()}
              />

              <PrimaryButton
                text="Forgot the password?"
                type="text-only"
                className="pt-3 pl-1 text-xs text-neutral-500 font-normal text-right w-full"
                onClick={() => console.log()}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-14">
            <PrimaryButton
              text="Login"
              type="submit"
              className="bg-purple-01 text-neutral-0 py-2.5 mt-3 font-semibold"
            />

            <div className="text-xs font-normal text-neutral-500 justify-center flex">
              <p>Don't have an account yet?</p>&nbsp;
              <PrimaryButton
                text="Register"
                type="text-only"
                className="text-purple-01 font-semibold"
                onClick={() => navigate("/register")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};