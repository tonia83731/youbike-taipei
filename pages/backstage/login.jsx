import HeadSettings from "@/components/head/HeadSettings"
import DefaultInput from "@/components/input/DefaultInput";
import { useState } from "react";

export default function BackStageLogin() {
  const [loginData, setLoginData] = useState({
    email: '', password: ''
  })
  return (
    <>
      <HeadSettings
        pageName="後臺登入"
        pageDescription="This is YouBike news page."
      />
      <section className="mb-6">
        <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
          後臺登入
        </h3>
        <form action="" className="">
          <DefaultInput
            label="Email"
            id="backLogin-email"
            name="email"
            isRequired={true}
            inputValue={loginData.email}
            onInputChange={(e) =>
              setLoginData({ ...formData, email: e.target.value })
            }
          />
          <DefaultInput
            label="Password"
            id="backLogin-password"
            name="password"
            isRequired={true}
            inputValue={loginData.password}
            onInputChange={(e) =>
              setLoginData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-lime-100 text-white rounded-md"
          >
            提交
          </button>
        </form>
      </section>
    </>
  );
}