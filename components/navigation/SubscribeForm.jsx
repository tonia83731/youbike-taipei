import { useState } from "react";

export default function SubscribeForm() {
  const [inputValue, setInputValue] = useState("");

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();

    fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
          className="h-8 px-2 bg-olive-100 text-white rounded-r-md"
        >
          訂閱
        </button>
      </div>
    </form>
  );
}
