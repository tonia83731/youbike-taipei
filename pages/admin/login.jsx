import HeadSettings from "@/components/head/HeadSettings";
import DefaultInput from "@/components/input/DefaultInput";
import AuthLayout from "@/components/backstage/authLayout";

import { useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function BackStageLogin() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email: loginData.email,
      password: loginData.password,
    });

    if (!response.error) {
      router.replace("/backstage/news-list");
    }
  };

  return (
    <>
      <AuthLayout>
        <HeadSettings
          pageName="後臺登入"
          pageDescription="This is YouBike news page."
        />
        <section className="mb-6">
          <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
            後臺登入
          </h3>
          <form action="" className="" onSubmit={handleLoginSubmit}>
            <DefaultInput
              label="Email"
              id="backLogin-email"
              name="email"
              isRequired={true}
              inputValue={loginData.email}
              onInputChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <DefaultInput
              label="Password"
              id="backLogin-password"
              name="password"
              isRequired={true}
              inputValue={loginData.password}
              onInputChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-lime-100 text-white rounded-md"
            >
              登入
            </button>
          </form>
        </section>
      </AuthLayout>
    </>
  );
}
