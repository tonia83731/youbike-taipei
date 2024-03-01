import { useState } from "react";

export default function SubscribeForm() {
  const [inputValue, setInputValue] = useState("");

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email: inputValue }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.ok) {
        const data = await response.json()
        setInputValue('')
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <form
      action=""
      className="mt-2 lg:flex lg:justify-end"
      onSubmit={handleSubscribeSubmit}
    >
      <div className="grid grid-cols-5">
        <input
          type="email"
          className="w-full h-8 px-4 col-span-4 bg-white border border-olive-100 border-r-0 rounded-l-md focus:outline-none focus:border-lime-100 placeholder:text-base"
          name="email"
          id="subscribe-email"
          required={true}
          placeholder="請輸入email來訂閱"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="h-8 px-2 bg-olive-100 text-white rounded-r-md lg:text-lg"
        >
          訂閱
        </button>
      </div>
    </form>
  );
}
